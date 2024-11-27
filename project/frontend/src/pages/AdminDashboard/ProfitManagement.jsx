import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProfitChart = () => {
  const [profitData, setProfitData] = useState({ labels: [], datasets: [] });
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetchProfitData();
  }, []);

  const fetchProfitData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/daily-profits"
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(a._id) - new Date(b._id)
      );

      const labels = sortedData.map(
        (item) => new Date(item._id).toISOString().split("T")[0]
      );
      const profits = sortedData.map((item) =>
        parseFloat(item.totalProfit.toFixed(2))
      );

      setProfitData({
        labels,
        datasets: [
          {
            label: "Daily Profit",
            data: profits,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching profit data:", error);
    }
  };

  const fetchOrderDetails = async (date) => {
    try {
      // Ensure the date is in the correct format (YYYY-MM-DD)
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const response = await axios.get(
        `http://localhost:3000/api/admin/daily-order-details/${formattedDate}`
      );
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedDate = profitData.labels[clickedIndex];
      setSelectedDate(clickedDate);
      fetchOrderDetails(clickedDate);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Profits Chart",
      },
    },
    onClick: handleChartClick,
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8" style={{ height: "400px" }}>
        <Line options={options} data={profitData} />
      </div>

      {selectedDate && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Order Details for {selectedDate}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Beverage Name</th>
                  <th className="px-4 py-2">Barista Name</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{order.userName}</td>
                    <td className="px-4 py-2">{order.beverageName}</td>
                    <td className="px-4 py-2">{order.baristaName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfitChart;
