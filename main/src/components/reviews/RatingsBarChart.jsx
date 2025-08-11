import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RatingsBarChart() {
  const ratings = [5, 4, 2, 1, 3, 4, 5, 2, 5, 2, 4, 1, 5];

  // Count occurrences of each rating (1 to 5)
  const ratingCounts = [1, 2, 3, 4, 5].map(
    (rating) => ratings.filter((r) => r === rating).length
  );

  const data = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Number of Ratings",
        data: ratingCounts,
        backgroundColor: [
          "#ff4d4d",
          "#ffa64d",
          "#ffd11a",
          "#66cc66",
          "#3399ff",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Ratings Distribution",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default RatingsBarChart;
