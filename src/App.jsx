import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/authSlice";
import { createBrowserRouter, Outlet } from "react-router";
import Dashboard_Page from "./pages/Dashboard_Page";
import Log_In_Page from "./pages/Log_In_Page";
import Sign_Up_Page from "./pages/Sign_Up_Page";
import Task_Page from "./pages/Task_Page";
import PrivateRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";
import Dashboard_Layout from "./pages/Dashboard_Layout";
import Report_Page from "./pages/Report_Page";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("inside effect ", token);
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);
  return (
    <>
      <Outlet />
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Log_In_Page />, // No Sidebar or Header
      },
      {
        path: "/signup",
        element: <Sign_Up_Page />, // No Sidebar or Header
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard_Layout /> {/* Wrap protected routes */}
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Dashboard_Page />,
          },
          {
            path: "/dashboard/report",
            element: <Report_Page />,
          },
        ],
      },
    ],
  },
]);

export default appRouter;
