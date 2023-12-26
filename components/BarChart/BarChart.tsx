import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SummaryResponse } from 'types/Summary';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

interface BarChartProps {
    summary: SummaryResponse | undefined;
}

export function BarChart({ summary }: BarChartProps) {
    const kcalData = {
        labels: ['Kcal'],
        datasets: [
            {
                label: 'Suma',
                data: [summary?.summaryData.kcal],
                backgroundColor: 'rgba(31, 230, 140, 0.5)',
            },
            {
                label: 'Cel',
                data: [summary?.dailyGoals?.kcal ?? 0],
                backgroundColor: 'rgba(100, 100, 100, 0.5)',
            },
        ],
    };
    const proteinData = {
        labels: ['Protein'],
        datasets: [
            {
                label: 'Suma',
                data: [summary?.summaryData.protein],
                backgroundColor: 'rgba(31, 230, 140, 0.5)',
            },
            {
                label: 'Cel',
                data: [summary?.dailyGoals?.protein ?? 0],
                backgroundColor: 'rgba(100, 100, 100, 0.5)',
            },
        ],
    };
    const fatData = {
        labels: ['Fat'],
        datasets: [
            {
                label: 'Suma',
                data: [summary?.summaryData.fat],
                backgroundColor: 'rgba(31, 230, 140, 0.5)',
            },
            {
                label: 'Cel',
                data: [summary?.dailyGoals?.fat ?? 0],
                backgroundColor: 'rgba(100, 100, 100, 0.5)',
            },
        ],
    };
    const carbsData = {
        labels: ['Carbs'],
        datasets: [
            {
                label: 'Suma',
                data: [summary?.summaryData.carbs],
                backgroundColor: 'rgba(31, 230, 140, 0.5)',
            },
            {
                label: 'Cel',
                data: [summary?.dailyGoals?.carbs ?? 0],
                backgroundColor: 'rgba(100, 100, 100, 0.5)',
            },
        ],
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <Bar width="100%" options={options} data={kcalData} />
            </div>
            <div style={{ flex: 1 }}>
                <Bar width="100%" options={options} data={proteinData} />
            </div>
            <div style={{ flex: 1 }}>
                <Bar width="100%" options={options} data={fatData} />
            </div>
            <div style={{ flex: 1 }}>
                <Bar width="100%" options={options} data={carbsData} />
            </div>
        </div>
    );
}
