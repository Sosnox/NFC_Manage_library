import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const data = {
  labels: ['Were Wolf', 'Another'],
  datasets: [
    {
      label: '# of Votes',
      data: [15, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const, // หรือ 'center', 'left', 'right', 'bottom', undefined
    },
  },
};

const DoughnutChart = () => {

  Chart.register({});

  return (
    <div className='w-full h-full'>
      <label className="text-[32px] font-semibold underline">Popular BoardGame </label>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;