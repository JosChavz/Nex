"use client";

import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
} from "@mui/material";
import Toggle from "../Toggle";
import HeaderAvatar from "./HeaderAvatar";

export default function Header() {
    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: (theme) => theme.palette.background.paper,
                color: (theme) => theme.palette.text.primary,
                boxShadow: 1,
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
                {/* Logo/Brand */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <a href={"/dashboard"}>
                        <Typography
                            variant="h6"
                            component="div"
                            className={'font-black uppercase'}
                        >
                            nex
                        </Typography>
                    </a>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Toggle />
                    </Box>

                    <HeaderAvatar />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
