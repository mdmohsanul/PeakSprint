import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClosedTasks,
  fetchLastWeekReport,
  fetchPendingTasks,
} from "../features/reportSlice";
import Dashboard_Shimmer from "../Shimmer_UI/Dashboard_Shimmer";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import useDate from "../hooks/useDate";
import "chart.js/auto";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Report_Page = () => {
  const dispatch = useDispatch();
  const extractedDate = useDate();
  const { reportLastWeek, closedTasks, pendingTasks, status, error } =
    useSelector((state) => state.report);

  const getClosedTaskLastWeek = reportLastWeek?.reduce((task, curr) => {
    task[curr.name] = (task[curr.name] || 0) + 1;
    return task;
  }, {});

  const closedTasksLastWeek = {
    labels: Object.keys(getClosedTaskLastWeek),
    datasets: [
      {
        label: "Leads",
        data: Object.values(getClosedTaskLastWeek),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        hoverBorderWidth: 2,
        hitRadius: 4,
      },
    ],
  };
  const getPendingTasksDays = pendingTasks?.reduce(
    (sum, curr) => sum + curr.timeToComplete,
    0
  );

  const pendingTaskDaysChart = {
    labels: ["Total Pending Work"],
    datasets: [
      {
        label: "Your Pending Days",
        data: [getPendingTasksDays],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };
  const pendingTaskDaysOptions = {
    datasets: {
      bar: {
        barThickness: 50,
      },
    },
  };
  const getClosedTasksByTeam = closedTasks?.reduce((acc, curr) => {
    acc[curr.team.name] = (acc[curr.team.name] || 0) + 1;
    return acc;
  }, {});
  const closedTasksByTeamOptions = {
    responsive: true,
    datasets: {
      bar: {
        barThickness: 50,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0, // Set the minimum value
        max: 5, // Set the maximum value
        ticks: {
          stepSize: 1, // Set the step size
        },
      },
    },
  };
  const closedTasksByTeamChart = {
    labels: Object.keys(getClosedTasksByTeam),
    datasets: [
      {
        label: "Tasks Closed by Teams",
        data: Object.values(getClosedTasksByTeam),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };
  useEffect(() => {
    dispatch(fetchLastWeekReport());
    dispatch(fetchClosedTasks());
    dispatch(fetchPendingTasks());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="page-container">
        <Dashboard_Shimmer />
      </div>
    );
  if (status === "failed")
    return <div className="page-container">Error: {error}</div>;
  return (
    <>
      <div className="page-container">
        <h1 className="text-3xl text-gray-800 font-semibold inline-block md:pr-10 pb-5 md:pb-0 ">
          Report
        </h1>
        <div className="max-w-5xl mt-8">
          <div className="grid   md:grid-cols-2 gap-10   mb-9 ">
            <div>
              <p className="text-center text-2xl text-gray-800">
                Tasks Closed Last Week
              </p>
              <Pie
                data={closedTasksLastWeek}
                style={{ width: "480px", height: "500px" }}
              />
            </div>

            <div>
              <p className="text-center text-2xl text-gray-800">
                Total Days of Work Pending
              </p>
              <Bar
                data={pendingTaskDaysChart}
                options={pendingTaskDaysOptions}
                style={{ width: "480px", height: "500px" }}
              />{" "}
            </div>
            <div>
              <p className="text-center text-2xl text-gray-800">
                Tasks Closed By Teams
              </p>
              <Bar
                data={closedTasksByTeamChart}
                options={closedTasksByTeamOptions}
                style={{ width: "480px", height: "500px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report_Page;
