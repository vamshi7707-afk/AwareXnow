import {
    Container,
    Typography,
} from "@mui/material";

export default function ContactUs() {
    return (
        <Container maxWidth="lg" sx={{ py: 10 }}>

            {/* Title */}
            <Typography variant="h3" fontWeight={700} align="center" gutterBottom>
                Contact Us
            </Typography>

            <Typography
                align="center"
                color="text.secondary"
                sx={{ mt: 1, mb: 6, maxWidth: 700, mx: "auto", fontSize: '1.1rem' }}
            >
                We'd love to hear from you. Whether you have a question about campaigns, donations,
                or anything else, our team is ready to answer all your questions.
            </Typography>

            <Typography
                align="center"
                color="text.secondary"
                sx={{ mt: 1, mb: 6, mx: "auto", fontSize: '1.4rem' }}>
                📍 Adelaide, Australia  |  📞 +61 410 000 014  |  ✉️ info@awarexnow.com
            </Typography>





            {/* Main Grid */}
            {/* <Grid container spacing={6} xs={12} md={12}>

                <Grid item xs={12} md={4}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            p: 3,
                            height: '100%',
                            background: '#fefefe',
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Contact Information
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                📍 Melbourne, Australia
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                📞 +61 412 345 678
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                ✉️ info@yourwebsite.com
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                🕒 Mon - Fri : 9:00 AM - 6:00 PM
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8} >
                    <Card elevation={3} sx={{ borderRadius: 3, p: 3 }}>
                        <CardContent>
                            <Box component="form" noValidate>
                                <Grid container spacing={3}>
                                    <Stack spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Full Name"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Email"
                                                type="email"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Subject"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message"
                                                multiline
                                                rows={5}
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#c91f2f",
                                                    px: 6,
                                                    py: 1.8,
                                                    fontWeight: 600,
                                                    "&:hover": {
                                                        backgroundColor: "#b31b2a",
                                                    },
                                                }}
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Stack>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>


            </Grid> */}
        </Container>
    );
}