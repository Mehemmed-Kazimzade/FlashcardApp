import { PieChart } from '@mui/x-charts/PieChart';

export default function ScorePieChart({rCards, fCards}) {
    // rCards => remembered Cards
    // fCards => forgotten cards

    const data = [
        { id: 0, value: rCards, label: "Remembered Cards", color: "#007E33" },
        { id: 1, value: fCards, label: "Forgotten Cards", color: "#FF8800" },
    ]

    return (
            <PieChart width={200} height={200}
                series={[{
                data: data
                    }]}
        />
    )
}