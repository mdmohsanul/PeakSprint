import React from "react";
import { Bar } from "react-chartjs-2";
import
import "chart.js/auto";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchClosedTasks } from "../../features/reportSlice";

// Register required Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Closed_Tasks = () => {
  const dispatch = useDispatch();
  const extractedDate = useDate();
  const { reportLastWeek, closedTasks, pendingTasks, status, error } =
    useSelector((state) => state.report);
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tasks Closed by Teams",
      },
    },
    scales: {
      y: {
        min: 0, // Set the minimum value
        max: 10, // Set the maximum value
        ticks: {
          stepSize: 1, // Set the step size
        },
      },
    },
  };
  const getClosedTasks = closedTasks?.reduce((acc, curr) => {
    acc[curr.team.name] = (acc[curr.team.name] || 0) + 1;
    return acc;
  }, {});
  const chartDataLastWeek = {
    labels: Object.keys(getClosedTasks),
    datasets: [
      {
        label: "Tasks Closed by Teams",
        data: Object.values(getClosedTasks),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };
  useEffect(() => {
    dispatch(fetchClosedTasks());
  }, [dispatch]);
  return (
    <>
      <Bar
        data={chartDataLastWeek}
        options={barChartOptions}
        style={{ width: "480px", height: "500px" }}
      />
    </>
  );
};

export default Closed_Tasks;
