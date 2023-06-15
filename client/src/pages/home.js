import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material";
import Header from "../components/header";

const Home = () => {
    const [users, setUsers] = useState([])

    const fetchUserData = () => {
        fetch("http://localhost:8000/api/user/")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUsers(data.users)
            })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div>
            <Header />
            <Typography variant="h4" padding={10} textAlign="center" color="primary">
                Welcome to the Profile
            </Typography>
            <Box
                maxWidth={200}
                alignItems="left"
                padding={4}
                margin="auto"
                borderRadius={2}
                border={1.5}
                borderColor="#1976d2"
            >
                <Typography fontSize="1.25rem" color="primary">
                    Users
                </Typography>
                <Typography fontSize="1rem" color="#a9a9a9">
                    {users.length > 0 && (
                        <ul style={{ listStyle: 'square' }}>
                            {users.map(user => (
                            <li>{user.name}</li>
                            ))}
                        </ul>
                    )}
                </Typography>
            </Box>
        </div>
    );
}

export default Home;