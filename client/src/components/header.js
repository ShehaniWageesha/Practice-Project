import React, { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Toolbar
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Box marginLeft="auto">
                    {isLoggedIn && (
                        <Button
                            onClick={() => dispatch(authActions.logout())}
                            LinkComponent={Link}
                            to="/"
                            variant="contained"
                            sx={{
                                margin: 1,
                                borderRadius: 10,
                                color: "#ffffff"
                            }}
                        >
                            Sign Out
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;