


// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const PieActiveArc = ({ departments }) => {
//   const data = {
//     labels: departments.map(dep => dep.name),
//     datasets: [
//       {
//         label: 'Departments',
//         data: departments.map(dep => dep.id), // You can use a different metric here
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#FF9F40'
//         ],
//         borderColor: '#fff',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <Pie data={data} />
//   );
// };

// export default PieActiveArc;



// PieActiveArc.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement);

const PieActiveArc = ({ departments }) => {
  const preparePieChartData = (departments) => {
    // Example: Count the number of departments
    const departmentCounts = departments.reduce((acc, department) => {
      const departmentName = department.name;
      if (!acc[departmentName]) {
        acc[departmentName] = 0;
      }
      acc[departmentName]++;
      return acc;
    }, {});

    return {
      labels: Object.keys(departmentCounts),
      datasets: [{
        data: Object.values(departmentCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }],
    };
  };

  const chartData = preparePieChartData(departments);

  return <Pie data={chartData} />;
};

export default PieActiveArc;
