import { Container, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
      <Container className={"text-center mt-14"}>
          <Typography variant={"h4"} component={"h1"} sx={{ mb: 2 }}>
              Forbidden Access
          </Typography>
          <Typography variant={"body1"} sx={{ mb: 2 }}>
              Access to this resource is restricted. You need to have a valid UCSC account.
          </Typography>
          <Link href={"/"}>
              <Button variant={"contained"}>Return Home</Button>
          </Link>
      </Container>
  )
}
