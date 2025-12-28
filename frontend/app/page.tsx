"use client";

import {Button, Container} from "@mui/material";
import {signInWithGoogle} from "@/app/lib/auth-client";

export default function Home() {
  return (
      <Container>
        <h1>Login</h1>
        <Button onClick={() => signInWithGoogle()}>Sign in with Google</Button>
      </Container>
  );
}
