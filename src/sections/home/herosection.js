import React from 'react'
import {
    Container,
    Typography,
    Button,
    Box,
} from "@mui/material";
import heroImage from "../../assets/herobg.png";


// "url(https://www.freepik.com/free-photo/volunteers-posting-social-media_2827247.htm#fromView=search&page=1&position=12&uuid=8999e3e0-513f-43e9-a549-af61a8e95329&query=volunteer+image)"

export default function HeroSection() {
    return (
        <section>
            <Box
                sx={{
                    height: "100vh",
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    color: "#000",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to right, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 80%)",
                    }}
                />

                <Container
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        height: "80%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h2" fontWeight="bold" mb={2}>
                        Making the world
                        <br />
                        better together
                    </Typography>

                    <Typography variant="h5" mb={4}>
                        Be aware. Be kind. Be the change.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                        >
                            Join Now
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ color: "#000", borderColor: "#000" }}
                        >
                            Know More
                        </Button>
                    </Box>
                </Container>
            </Box>
        </section>

    )
}

