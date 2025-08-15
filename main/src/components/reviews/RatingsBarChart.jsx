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
  const ratings = [1, 1.5, 1.5, 2, 3.5, 5];

  // Generate steps: 0.5, 1.0, 1.5, ..., 5.0
  const ratingSteps = Array.from({ length: 10 }, (_, i) => (i + 1) * 0.5);

  // Count occurrences of each rating step
  const ratingCounts = ratingSteps.map(
    (step) => ratings.filter((r) => r === step).length
  );

  const data = {
    labels: ratingSteps.map((r) => `${r} Stars`),
    datasets: [
      {
        label: "Number of Ratings",
        data: ratingCounts,
        backgroundColor: "#3399ff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Ratings Distribution (0.5 Increments)",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const count = context.raw;
            const total = context.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const rating = parseFloat(context.label); // e.g., "1.5 Stars" → 1.5

            // Generate star string
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 === 0.5;
            const starText = "⭐".repeat(fullStars) + (halfStar ? "½" : "");

            // Calculate percentage
            const percentage =
              total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";

            return `${starText} - ${count} ratings (${percentage}%)`;
          },
          title: () => "", // Remove the default title (which would be the label)
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false, // Hide Y-axis labels
        },
        grid: {
          display: false, // Hide Y-axis grid
        },
      },
      x: {
        ticks: {
          display: false, // Hide X-axis labels
        },
        grid: {
          display: false, // Hide X-axis grid
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default RatingsBarChart;
