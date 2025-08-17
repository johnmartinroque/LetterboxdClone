// RatingsBarChart.js
import React, { useEffect, useState } from "react";
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
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path to your firebase config

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RatingsBarChart({ filmId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("filmId", "==", filmId));
        const snapshot = await getDocs(q);

        const fetchedRatings = snapshot.docs.map(
          (doc) => doc.data().rating // get rating field
        );
        setRatings(fetchedRatings);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (filmId) {
      fetchRatings();
    }
  }, [filmId]);

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
        text: "RATINGS",
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
          title: () => "",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { display: false },
        grid: { display: false },
      },
      x: {
        ticks: { display: false },
        grid: { display: false },
      },
    },
  };

  if (loading) return <p style={{ color: "white" }}>Loading ratings...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Left star */}
        <i
          className="fa-solid fa-star"
          style={{ fontSize: "10px", color: "#ffe601", marginRight: "10px" }}
        ></i>

        {/* Chart */}
        <div style={{ flex: 1 }}>
          <Bar data={data} options={options} />
        </div>

        {/* Right star */}
        <i
          className="fa-solid fa-star"
          style={{ fontSize: "10px", color: "#ffe601", marginRight: "3px" }}
        ></i>
        <i
          className="fa-solid fa-star"
          style={{ fontSize: "10px", color: "#ffe601", marginRight: "3px" }}
        ></i>
        <i
          className="fa-solid fa-star"
          style={{ fontSize: "10px", color: "#ffe601", marginRight: "3px" }}
        ></i>
        <i
          className="fa-solid fa-star"
          style={{ fontSize: "10px", color: "#ffe601", marginRight: "3px" }}
        ></i>
        <i
          className="fa-solid fa-star"
          style={{ fontSize: "10px", color: "#ffe601", marginRight: "3px" }}
        ></i>
      </div>
    </div>
  );
}

export default RatingsBarChart;
