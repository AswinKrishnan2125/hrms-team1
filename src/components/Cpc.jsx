// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// // import { PieChart } from 'recharts';


// const data = [
//   { id: 0, value: 10, label: 'Dept A' },
//   { id: 1, value: 15, label: 'Dept B' },
//   { id: 2, value: 20, label: 'Dept C' },
// ];

// export default function PieActiveArc() {
//   return (
//     <PieChart
//       series={[
//         {
//           data,
//           highlightScope: { faded: 'global', highlighted: 'item' },
//           faded: { innerRadius: 30, additionalRadius: -30, color: 'gtext-gray-700' },
//         },
//       ]}
//       height={250}
//     />
//   );
// }



import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PieActiveArc = ({ departments }) => {
  const data = {
    labels: departments.map(dep => dep.name),
    datasets: [
      {
        label: 'Departments',
        data: departments.map(dep => dep.id), // You can use a different metric here
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40'
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={data} />
  );
};

export default PieActiveArc;

