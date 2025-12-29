'use client'

import {Avatar, IconButton, Skeleton} from "@mui/material";
import React, {useState} from "react";
import {authClient} from "@/app/lib/auth-client";
import HeaderMenu from "@/app/components/header/HeaderMenu";

export default function HeaderAvatar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {
        data: session,
        isPending,
        error,
        refetch
    } = authClient.useSession()

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // const handleProfileClick = () => {
    //   handleMenuClose();
    //   // onProfile?.();
    // };

    // const handleSettingsClick = () => {
    //   handleMenuClose();
    //   // onSettings?.();
    // };

    if (isPending) {
        return (
            <IconButton
                size="small"
                sx={{ ml: 1 }}
                disabled
            >
                <Skeleton variant="circular" width={40} height={40} />
            </IconButton>
        );
    }

    return (
        <>
            {/* Avatar with Menu */}
            <IconButton
                onClick={handleAvatarClick}
                size="small"
                sx={{
                    ml: 1,
                }}
                aria-controls={!!anchorEl ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={!!anchorEl ? "true" : undefined}
            >
                <Avatar
                    //   src={userImage}
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "primary.main",
                        "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.2s",
                        },
                    }}
                >
                    {/* {!userImage && userInitials} */}
                </Avatar>
            </IconButton>

            <HeaderMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} user={session?.user} />
        </>
    );
}
