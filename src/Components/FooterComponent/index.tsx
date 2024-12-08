    import { Box, Typography, Link, Divider, Grid } from "@mui/material";

    export const Footer = () => {
    return (
        <Box sx={{ backgroundColor: "#F5F8FD" ,mt:12}}>
        <Grid container sx={{px:18,py:3}} spacing={8}>
            <Grid item xs={12} sm={2.5}>
            <Box
                sx={{
                backgroundColor: "#FC8A06",
                color: "#fff",
                p: 2,
                borderRadius: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" ,fontFamily:"Playfair"}}>
                TiffinMate
                </Typography>
                <Typography>Tuesday – Saturday: 12:00pm – 23:00pm</Typography>
                <Typography sx={{ mt: 1 }}>Closed on Sunday</Typography>
                <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                5 star rated on TripAdvisor
                </Typography>
            </Box>
            </Grid>
            <Grid item sm={2}>
            <Typography variant="h6" sx={{borderBottom:"2px solid orange",mb:1}}>
                About
            </Typography>
            {['Top Rated', 'Vendors', 'subscription', 'Contact'].map((text, index) => (
                <Typography key={index} sx={{ mb: 0.5 }}>
                <Link href="#" underline="hover" color="inherit">
                    {text}
                </Link>
                </Typography>
            ))}
            </Grid>
            <Grid item sm={2}>
            <Typography variant="h6" sx={{borderBottom:"2px solid orange",mb:1}}>
                About
            </Typography>
            {['Top Rated', 'Vendors', 'subscription', 'Contact'].map((text, index) => (
                <Typography key={index} sx={{ mb: 0.5 }}>
                <Link href="#" underline="hover" color="inherit">
                    {text}
                </Link>
                </Typography>
            ))}
            </Grid>
        </Grid>
        
        
        <Divider sx={{ my: 4 }} />
        <Box
            sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            px: 2,
            }}
        >
            <Typography variant="body2" sx={{ color: "grey" }}>
            © 2024 TiffinMate | All rights reserved
            </Typography>
            <Box>
            <Link href="#" sx={{ color: "grey", mx: 1 }}>
                Facebook
            </Link>
            <Link href="#" sx={{ color: "grey", mx: 1 }}>
                Instagram
            </Link>
            </Box>
        </Box>
        </Box>
    );
    };
