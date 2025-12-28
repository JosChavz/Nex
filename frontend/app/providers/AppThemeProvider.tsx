"use client";

import {
    createTheme,
    CssBaseline,
    InitColorSchemeScript,
    ThemeProvider,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                background: {
                    default: "white",
                },
            },
        },
        dark: {
            palette: {
                background: {
                    default: "black",
                },
            },
        },
    },
    typography: {
        fontFamily: `var(${geistMono.variable})`,
        body1: {
            fontFamily: `var(${geistSans.variable})`,
        },
    },
    cssVariables: {
        colorSchemeSelector: "class",
        disableCssColorScheme: true,
    },
});

export function AppThemeProvider({
                                     children,
                                 }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <InitColorSchemeScript attribute="class" />
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </>
    );
}
