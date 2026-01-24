import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container} from "@mui/material";

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container component={"main"} sx={{ mt: 14 }} maxWidth={"md"}>
            {children}
        </Container>
    );
}
