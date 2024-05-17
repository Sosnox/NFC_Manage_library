import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const DoughnutChart = ({ data }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Rating max 5',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    });

    useEffect(() => {
        if (data) {
            const labels = data.map(item => item.title_boardgame).slice(0, 5);
            const dataPoints = data.map(item => item.total_rating).slice(0, 5);
            setChartData({
                labels: labels,
                datasets: [{
                    label: 'Rating max 5 ',
                    data: dataPoints,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                }]
            });
        }
    }, [data]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Average Rating of Top 5 Board Games',
                font: {
                    size: 13
                },
                padding: {
                    top: 10,
                },
                color: '#666'
            }
        },
    };

    return (
        <div className='flex justify-center items-center'>
            <div className='w-[230px] h-[230px]'>
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
};

export default DoughnutChart;
