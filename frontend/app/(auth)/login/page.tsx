'use client'

import {Button, Container, Typography} from "@mui/material";
import {signInWithGoogle} from "@/app/lib/auth-client";

export default function LoginPage() {
    return (
        <Container className={'mt-14 text-center'}>
            <Typography variant={"h1"} component={"h1"} className={'font-black uppercase'}>Login</Typography>
            <Typography variant={'body2'} className={'italic'}>down there</Typography>
            <Button className={'mt-10'} onClick={() => signInWithGoogle()}>Sign in with Google</Button>
        </Container>
    );
}
