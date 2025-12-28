"use client";

import { Tooltip, Box } from "@mui/material";
import { styled, useColorScheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// Use a more generic styled approach that doesn't depend on theme.palette.mode
const ToggleContainer = styled(Box)(({ theme }) => [
    {
        position: "relative",
        width: 56,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            transform: "scale(1.02)",
        },
    },
    theme.applyStyles("dark", {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
        },
    }),
]);

const ToggleThumb = styled(Box)(({ theme }) => [
    {
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        transform: `translateX(0px)`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: theme.shadows[2],
        "&:hover": {
            boxShadow: theme.shadows[4],
        },
    },
    theme.applyStyles("dark", {
        transform: "translateX(24px)",
    }),
]);

const IconContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible: boolean }>(({ isVisible }) => ({
    opacity: isVisible ? 1 : 0,
    transform: `scale(${isVisible ? 1 : 0.5}) rotate(${isVisible ? 0 : 180}deg)`,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
}));

export default function Toggle() {
    const { mode, setMode } = useColorScheme();

    if (!mode) {
        return (
            <Box
                sx={{
                    width: 56,
                    height: 32,
                    borderRadius: 2,
                    opacity: 0.3,
                    backgroundColor: "rgba(128, 128, 128, 0.1)",
                    border: "1px solid rgba(128, 128, 128, 0.2)",
                }}
            />
        );
    }

    const isDark = mode === "dark";

    const toggleTheme = () => {
        const toggleMode = mode === "system" || mode === "light" ? "dark" : "light";
        setMode(toggleMode);
    };

    return (
        <Tooltip
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
            arrow
            placement="bottom"
        >
            <ToggleContainer
                onClick={toggleTheme}
                role="button"
                tabIndex={0}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleTheme();
                    }
                }}
            >
                <ToggleThumb>
                    <IconContainer isVisible={!isDark}>
                        <LightModeIcon sx={{ fontSize: 16 }} />
                    </IconContainer>
                    <IconContainer
                        isVisible={isDark}
                        sx={{
                            position: "absolute",
                        }}
                    >
                        <DarkModeIcon sx={{ fontSize: 16 }} />
                    </IconContainer>
                </ToggleThumb>
            </ToggleContainer>
        </Tooltip>
    );
}
