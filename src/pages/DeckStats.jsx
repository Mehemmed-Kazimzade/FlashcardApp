import {Box,Typography,MenuItem,Select,FormControl,InputLabel,Paper,Stack} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import {LineChart} from "@mui/x-charts/LineChart";
import getStats from "../utils/getStats";

export default function DeckStats() {
  const [selectedDeck, setSelectedDeck] = useState("Select Deck");
  const [data, setData] = useState(null);
  const stats = getStats();

  const handleChange = (event) => {
    setData(stats[event.target.value]);
    setSelectedDeck(event.target.value);
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }} className="statsContainer">
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          {Object.keys(stats).length === 0 ? "No practiced Decks yet" : "📊 Deck Performance"}
        </Typography>

        { Object.keys(stats).length !== 0 &&
        <Paper elevation={3} sx={{ p: 3, width: "100%",overflowX: 'auto' }}>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Select Deck</InputLabel>
              <Select value={selectedDeck} label="Select Deck" onChange={handleChange}>
                  <MenuItem value={"Select Deck"}>
                    Select Deck
                  </MenuItem>
                {Object.keys(stats).map((deck) => (
                  <MenuItem key={deck} value={deck}>
                    {deck}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {data &&  <Box sx={{ width: '100%', minWidth:"300px", height: { xs: 250, sm: 300, md: 350 } }}>
              <LineChart margin={{ left: -30 }}
                xAxis={[{ scaleType: "point", data: data.map((d) => d.date) }]}
                series={[
                  {
                    data: data.map((d) => d.score),
                    label: "Correct Answers",
                    type: "line",
                  },
                  {
                    data: data.map((d) => d.total),
                    label: "Total Cards",
                    type: "line",
                  },
                ]}
                grid={{ vertical: true, horizontal: true }}
              />
            </Box>}
          </Stack>
        </Paper>}
      </Box>
    </motion.div>
  );
}