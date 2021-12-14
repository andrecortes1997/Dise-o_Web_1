import React from 'react';
import { Bar } from "react-chartjs-2";

const BarChart = ({ title, descripcion, data }) => {
    const barChartOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "rgb(255, 255, 255)",
                beginAtZero: true,
              },
              gridLines: {
                color: "rgb(255, 255, 255)",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: "rgb(255, 255, 255)",
                fontColor: "rgb(255, 255, 255)"
              },
              ticks: {
                fontColor: "rgb(255, 255, 255)",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      };

    return (
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body bg-dark">
              <h4 className="card-title text-center text-light">{title}</h4>
              <h5 className="card-text text-center text-light">{descripcion}</h5>
              <Bar data={data} options={barChartOptions} />
            </div>
          </div>
        </div>
    );
}

export default BarChart;