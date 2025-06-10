import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

export default function ScorePieChart({ rCards, fCards }) {
    const data = [
        { id: 0, value: rCards, label: "Remembered Cards", color: "#007E33" },
        { id: 1, value: fCards, label: "Forgotten Cards", color: "#FF8800" },
    ];

    return (
        <Stack direction="column" spacing={2} alignItems="center" mt={4}>
            <PieChart
                width={200}
                height={200}
                series={[{ data }]} hideLegend
            />

            {/* Custom Legend */}
            <Stack spacing={1} alignItems="center">
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#007E33' }} />
                    Remembered Cards
                </Typography>

                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF8800' }} />
                    Forgotten Cards
                </Typography>
            </Stack>
        </Stack>
    );
}
