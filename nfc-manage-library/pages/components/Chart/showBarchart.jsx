import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart.js components we will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Game Title',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Board Game Scan Counts',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    }
  },
};



const BarChartPage = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Scan Counts',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  });

  useEffect(() => {
    const labels = data?.map(item => item.title_game);
    const dataPoints = data?.map(item => item.count_scan_boardgame);
    setChartData({
      labels: labels,
      datasets: [{
        label: 'Scan Counts',
        data: dataPoints,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }]
    });
  }, [data]);


  return (
    <div className='h-full w-full'>
      <br/>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChartPage;
