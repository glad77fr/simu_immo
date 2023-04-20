import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChartComponent({ monthlyLoanAmount, monthlyInsuranceAmount, rentAmount }) {
  const pieData = {
    labels: ['Prêt mensuel', 'Assurance mensuelle', 'Revenus mensuels'],
    datasets: [
      {
        data: [monthlyLoanAmount, monthlyInsuranceAmount, rentAmount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Cash Flow',
        font: {
          size: 20,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <div>
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
}

export default PieChartComponent;
