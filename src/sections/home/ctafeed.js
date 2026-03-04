import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
} from "@mui/material";

import img1 from "../../assets/background-3.png";
import img2 from "../../assets/background-2.png";
import img3 from "../../assets/background-1.png";
import img4 from "../../assets/background.png";


export default function CtaFeed() {

    function ImageBox({ img, height }) {
        return (
            <Box
                sx={{
                    height: height,
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: 2,
                }}
            >
                <Box
                    component="img"
                    src={img}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "0.4s",

                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    }}
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height: "auto",
                color: "#000",
                py: 5,
                my: 5,
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
                    Join Our Community Now
                </Typography>

                {/* Description */}
                <Typography
                    align="center"
                    sx={{ maxWidth: 800, mx: "auto", mt: 3, opacity: 0.8 }}
                >
                    Our clients and partners are at the heart of everything we do. Their feedback inspires us to keep improving, innovate boldly, and deliver excellence in every project. Here’s what some of them have to say:
                </Typography>
                <Typography align="center"
                    sx={{ maxWidth: 800, mx: "auto", mt: 3, opacity: 0.8 }} variant="h3" >
                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={6}>

                        <Grid container spacing={2} align="center">
                            <Grid item xs={6}>
                                <ImageBox img={img1} height="200px" />
                            </Grid>
                            <Grid item xs={6}>
                                <ImageBox img={img2} height="200px" />
                            </Grid>
                            <Grid item xs={12}>
                                <ImageBox img={img3} height="200px" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ImageBox img={img4} height="200px" />
                            </Grid>

                        </Grid>

                    </Grid>


                </Grid>

            </Container>
        </Box>
    );
}