import React from "react";
import {Container} from "@mui/material";

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container component={"main"} sx={{ mt: 4 }} maxWidth={"md"}>
            {children}
        </Container>
    );
}
