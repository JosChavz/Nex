import {Box, Container, Grid, Typography} from "@mui/material";

export default function DashboardPage() {
    return (
        <Grid container spacing={2} minHeight={"100vh"}>
            <Grid size={3} className={'bg-gray-100 p-4'}>
                <Box component={"aside"}>

                </Box>
            </Grid>
            <Grid size={9}>
                <Container component={"main"} sx={{ mt: 14 }}>
                    <Typography variant={"h1"} component={"h1"} className={'font-black uppercase'}>Nex</Typography>
                    <Typography variant={'body2'} className={'italic'}>what is your next project?</Typography>
                </Container>
            </Grid>
        </Grid>
    );
}
