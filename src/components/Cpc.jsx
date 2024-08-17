import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
// import { PieChart } from 'recharts';


const data = [
  { id: 0, value: 10, label: 'Dept A' },
  { id: 1, value: 15, label: 'Dept B' },
  { id: 2, value: 20, label: 'Dept C' },
];

export default function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gtext-gray-700' },
        },
      ]}
      height={250}
    />
  );
}
