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

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("inside effect ", token);
    if (token) {
      console.log("ifblock");
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);
  return (
    <>
      <Sidebar />
      <Header />
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
        element: <Dashboard_Page />,
      },
      {
        path: "/signup",
        element: <Sign_Up_Page />,
      },
      {
        path: "/login",
        element: <Log_In_Page />,
      },
      {
        path: "/team",
        element: (
          <PrivateRoute>
            <Task_Page />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default appRouter;
