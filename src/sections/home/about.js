import React from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Divider,
} from "@mui/material";

export default function AboutUs() {


    return (
        <Box
            sx={{
                height: "100vh",
                background: "linear-gradient(to right, #1a222c, #0f1720)",
                color: "#fff",
                py: 10,
            }}
        >
            <Container maxWidth="lg">

                {/* Title */}
                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                    gutterBottom
                >
                    About Us
                </Typography>

                {/* Description */}
                <Typography
                    align="center"
                    sx={{ maxWidth: 800, mx: "auto", mt: 3, opacity: 0.8 }}
                >
                    AwareXNow is a social awareness platform dedicated to creating positive change through connection, compassion, and community action.

                </Typography>
                <Typography
                    align="center"
                    sx={{ maxWidth: 800, mx: "auto", mt: 3, opacity: 0.8 }}
                >
                    We bring together individuals, organizations, and businesses to support meaningful causes across health, education, environment, and social wellbeing. Our mission is to make it easy for everyone to discover real issues, take action, and see the impact of their support.
                </Typography>
                <Typography
                    align="center"
                    sx={{ maxWidth: 800, mx: "auto", mt: 3, opacity: 0.8 }}
                >
                    AwareXNow is a social awareness platform dedicated to creating positive change through connection, compassion, and community action. We empower individuals and organizations to support meaningful causes and turn everyday kindness into lasting impact.
                </Typography>

                {/* Button */}
                {/* <Box textAlign="center" mt={5}>
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                    >
                        Know More
                    </Button>
                </Box> */}


                {/* Stats Section */}
                <Grid container spacing={12} mt={10} alignItems="center" justifyContent="center">

                    {/* Stat 1 */}
                    <Grid item xs={12} md={4} textAlign="center">
                        <Typography variant="h3" fontWeight="bold">
                            200+
                        </Typography>

                        <Typography sx={{ opacity: 0.7, mt: 2 }}>
                            Projects Completed
                            {/* – From small startups to large enterprises,
                            we have successfully delivered over 200 projects. */}
                        </Typography>
                    </Grid>


                    {/* Divider */}
                    <Grid item md={0.5} sx={{ display: { xs: "none", md: "block" } }}>
                        <Divider orientation="vertical" sx={{ background: "#555", height: 100 }} />
                    </Grid>


                    {/* Stat 2 */}
                    <Grid item xs={12} md={3.5} textAlign="center">
                        <Typography variant="h3" fontWeight="bold">
                            500+
                        </Typography>

                        <Typography sx={{ opacity: 0.7, mt: 2 }}>
                            Happy Clients
                            {/* – With over 500 satisfied clients,
                            we have established long-lasting partnerships. */}
                        </Typography>
                    </Grid>


                    {/* Divider */}
                    <Grid item md={0.5} sx={{ display: { xs: "none", md: "block" } }}>
                        <Divider orientation="vertical" sx={{ background: "#555", height: 100 }} />
                    </Grid>


                    {/* Stat 3 */}
                    <Grid item xs={12} md={3.5} textAlign="center">
                        <Typography variant="h3" fontWeight="bold">
                            100+
                        </Typography>

                        <Typography sx={{ opacity: 0.7, mt: 2 }}>
                            Team Members
                            {/* Our team of more than 100 skilled professionals. */}
                        </Typography>
                    </Grid>

                </Grid>

            </Container>
        </Box>
    );
}