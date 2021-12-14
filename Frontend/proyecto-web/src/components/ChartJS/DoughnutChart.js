import React from 'react';
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ title, descripcion, data }) => {

    const doughnutChartOptions = {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        legend: {
            position: 'top',
            labels: {
                fontColor: "rgb(255, 255, 255)",
            }
        },
      };

    return (
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body bg-dark">
              <h4 className="card-title text-center text-light">{title}</h4>
              <h5 className="card-text text-center text-light">{descripcion}</h5>
              <Doughnut data={data} options={doughnutChartOptions} />
            </div>
          </div>
        </div>
    );
}

export default DoughnutChart;