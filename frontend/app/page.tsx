"use client";

import { Container, Typography} from "@mui/material";

export default function Home() {
  return (
      <Container component={"main"} sx={{ mt: 14 }}>
        <Typography variant={"h1"} component={"h1"} className={'font-black uppercase'}>Nex</Typography>
        <Typography variant={'body2'} className={'italic'}>what is your next project?</Typography>
      </Container>
  );
}
