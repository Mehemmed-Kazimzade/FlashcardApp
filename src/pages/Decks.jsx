import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default function Decks() {
    return <>
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Your Decks</Typography>
        <Link to={"/createDeck/"}>
            <Button variant="contained" startIcon={<AddIcon />}>
                Create New Deck
            </Button>
        </Link>
      </Box>

      <TextField fullWidth variant="outlined" placeholder="Search decks..." sx={{ mb: 4 }} />

      {/* Deck List Grid */}
      <Grid container spacing={3} alignItems={"center"}>
        <Grid size={{xs: 12, sm: 6, md: 4}} xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              React Basics
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              10 cards • Last practiced: 2 days ago
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Best score: 8 / 10
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button size="small" variant="contained">Practice</Button>
              <Button size="small" variant="outlined">Edit</Button>
            </Box>
          </Paper>
        </Grid>


        <Grid size={{xs: 12, sm: 6,  md: 4}}>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <FolderOpenIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              You haven't created any decks yet.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Start by clicking “Create New Deck” above.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
}