import { Container, Typography, Box, Button, Stack, Grid, Paper} from "@mui/material";
import { Link } from "react-router";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export default function HomePage() {
  const features = [
    {
      title: "Build Your Own",
      desc: "Create personalized flashcards tailored to your learning.",
      icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Practice Smarter",
      desc: "Track what you remember and reinforce what you forget.",
      icon: <FlashOnIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Import Community Decks",
      desc: "Access pre-made decks in various topics instantly.",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    }
  ];

  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <Box className="mainContainer">

        <Container maxWidth="sm" sx={{ mb: 8 }}>

            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }} fontSize={{ xs: 28, lg: 40 }} >
                SwiftCards
            </Typography>

            <Typography variant="body1" color="gray" sx={{ mb: 4 }}>
                Practice smarter. Create, import, and review flashcards to master anything — fast and efficiently.
            </Typography>

            <Stack spacing={2} direction={{ xs: "column", sm: "row" }} justifyContent="center">

                <Link to={"/createDeck/"}>
                    <Button variant="contained" size="large" fullWidth sx={{ textTransform: "none", fontWeight: 500 }}>
                        Create Deck
                    </Button>
                </Link>

                <Link to={"/readyDecks/"}>
                    <Button variant="outlined" size="large" fullWidth sx={{ textTransform: "none",fontWeight: 500,}}>
                        Practice Ready Decks
                    </Button>
                </Link>

            </Stack>

        </Container>

        {/* Features Section */}
        <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
            {features.map((feature, idx) => (
                <Grid size={{ xs:12, sm: 10, md: 4 }} key={idx}>
                    <Paper elevation={3}
                        sx={{
                            p: {xs: 2, lg: 4 },
                            textAlign: "center",
                            borderRadius: 3,
                            height: "100%",
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                borderColor: "#1976d2"
                            }}}>

                    <Box mb={1}>
                        {feature.icon}
                    </Box>

                    <Typography variant="h6" gutterBottom>
                    {feature.title}
                    </Typography>

                    <Typography variant="body2" color="gray">
                    {feature.desc}
                    </Typography>

                </Paper>
                </Grid>
            ))}

            </Grid>
        </Container>
        </Box>
    </motion.div>
  );
}
