import {Menu, MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import {useRouter} from "next/navigation";
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';

type HeaderMenuProps = {
    anchorEl: null | HTMLElement;
    handleMenuClose: () => void;
    onProfile?: () => void;
    onSettings?: () => void;
    session: any;
};

export default function HeaderMenu({ anchorEl, handleMenuClose, session }: HeaderMenuProps) {
    const handleLogoutClick = async () => {
        handleMenuClose();
        await fetch("/api/auth/logout", {
            method: "POST",
        });
        router.push("/");
    };
    const router = useRouter();


    if (!session) {
        return (
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={!!anchorEl}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        <Link href={"/sign-up"}>Login/Register</Link>
                    </ListItemText>
                </MenuItem>
            </Menu>
        )
    }

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={!!anchorEl}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <MenuItem onClick={async () => handleLogoutClick()}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Menu>
    )
}
