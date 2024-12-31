import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import LoadingWrapper from "./LoadingWrapper";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const GenderAgeChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => {
        const ageGroups = {};
        data.forEach((user) => {
          const ageGroup = `${Math.floor(user.age / 10) * 10}-${
            Math.floor(user.age / 10) * 10 + 9
          }`;
          if (!ageGroups[ageGroup]) {
            ageGroups[ageGroup] = { men: 0, women: 0 };
          }
          ageGroups[ageGroup][user.gender] += 1;
        });

        const labels = Object.keys(ageGroups);
        const menData = labels.map((label) => ageGroups[label].men);
        const womenData = labels.map((label) => ageGroups[label].women);

        setChartData({
          labels,
          datasets: [
            {
              label: "Men",
              data: menData,
              backgroundColor: "#4A90E2",
            },
            {
              label: "Women",
              data: womenData,
              backgroundColor: "#FF6384",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gender Distribution by Age Groups",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age Groups",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return (
    <LoadingWrapper>
      <div className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-4 shadow rounded w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
            Gender and Age Statistics
          </h2>
          {chartData ? (
            <div
              className="relative"
              style={{ height: "300px", width: "100%" }}
            >
              <Bar data={chartData} options={options} />
            </div>
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default GenderAgeChart;
