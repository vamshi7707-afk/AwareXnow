import React, { useEffect, useState } from "react";
import { listenApprovedCampaigns } from "../../api/campaignApi";

import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip,
} from "@mui/material";

export default function CampaignFeed() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const unsub = listenApprovedCampaigns(setCampaigns);
        return () => unsub();
    }, []);

    return (
        <section>
            <Typography variant="h4" mb={6} mt={6} >
                Campaign Feed
            </Typography>
            <Grid container spacing={3}>
                {campaigns.map((c) => (
                    <Grid size={4} item xs={12} sm={6} md={4} key={c.id}>

                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >

                            {c.imageUrl && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={c.imageUrl}
                                    alt={c.title}
                                />
                            )}

                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >

                                {/* Top */}
                                <Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="h6">
                                            {c.title}
                                        </Typography>

                                        <Chip label="APPROVED" color="success" size="small" />
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        mt={2}
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {c.description}
                                    </Typography>
                                </Box>

                                {/* Bottom */}
                                <Box
                                    mt={2}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant="caption">
                                        By {c.createdByName}
                                    </Typography>

                                    {c.donateUrl && (
                                        <Button
                                            variant="contained"
                                            href={c.donateUrl}
                                            target="_blank"
                                        >
                                            Donate
                                        </Button>
                                    )}
                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>
                ))}
            </Grid>
        </section>
    )
}
