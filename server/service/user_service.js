import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route('/signup').post(async (req, res) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User already exists! Sign in instead" });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );

    user.token = token;

    try {
        await user.save();

    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({ user });
});

router.route('/signin').post(async (req, res) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found! Sign up first" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = jwt.sign(
        { user_id: existingUser._id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );

    existingUser.token = token;

    return res
        .status(200)
        .json({ message: "Sign in successful!", user: existingUser });
});

router.route('/').get(async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "No user found!" });
    }
    return res.status(200).json({ users });
});


export default router;
