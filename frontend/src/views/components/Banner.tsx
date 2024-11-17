import { Box, Button, Divider, Grid2, Card, TextareaAutosize, Typography, List, ListItem } from "@mui/material";

export default function Banner() {
    return (
        <Box sx={{ height: '100%' }}>
            <Box>
                {/* image header with dark overlay */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '40vh', // Define a height for the image section
                        backgroundImage: `url("https://www.sjsu.edu/_images/buildings/ADV_aerial-view_dorms-beyond_01.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: 'white',
                        display: 'flex', // Enables flexbox layout
                        alignItems: 'flex-end', // Aligns content at the vertical bottom
                    }}
                >
                    {/* Dark overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 30, 0.7)', // Semi-transparent black
                            zIndex: 1, // Places the overlay above the image
                        }}
                    />

                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 2, // Ensures content is above the overlay
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '3rem', md: '5rem', xl: '8rem' },
                            }}
                            >
                            MICRO SHOP
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '2rem', xl: '3rem' },
                            }}
                            >
                            Little Ideas, Big Success
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
