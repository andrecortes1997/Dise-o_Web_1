import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ title, descripcion, data }) => {
  const lineChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    legend: {
      display: false,
      position: 'top',
      labels: {
        fontColor: 'rgb(255, 255, 255)',
      },
    },
  };

  return (
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body bg-dark">
          <h4 className="card-title text-center text-light">{title}</h4>
          <h5 className="card-text text-center text-light">{descripcion}</h5>
          <Line data={data} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
