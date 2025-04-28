import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router";
import { loggedInUser, loginSuccess } from "../features/authSlice";
import Login_Image from "/Login_Page.webp";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";

const Log_In_Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isLoggingIn, setIsloggingIn] = useState(false);
  const [password, setShowPassword] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const location = useLocation();

  // Get the 'from' location or default to the userprofile Page
  const from = location.state?.from?.pathname || "/dashboard";
  const handleLogin = () => {
    setIsloggingIn(true);
    try {
      dispatch(loggedInUser(loginData)).then((result) => {
        if (result?.error?.message === "Rejected") {
          setErr(result.payload);
          setIsloggingIn(false);
        } else {
          navigate(from, { replace: true });
          // navigate("/dashboard");
        }
      });
    } catch (error) {
      setErr(error || "Failed to Log In. Please try again.");
    }
  };
  return (
    <>
      <div className="w-full bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="h-16 flex items-center border-b-2 border-red-500 px-5 md:px-0">
            <h1 className="text-4xl font-bold text-blue-700">PeakSprint</h1>
          </div>
          <div className="flex items-center flex-col md:flex-row md:justify-between justify-center md:mx-12 md:my-8">
            <div className="w-full hidden md:block">
              <img src={Login_Image} alt="Banner_Image" loading="lazy" />
            </div>

            <div className="md:w-full bg-white  rounded-lg shadow-[1px_1px_20px_10px_#00000024] dark:border mt-16 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                {err && (
                  <p className="bg-red-500 inline px-4">
                    <span className="text-white pr-3">❌</span>
                    {err}
                  </p>
                )}
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={loginData.email}
                      onFocus={() => setErr("")}
                      onChange={changeHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={password ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        onFocus={() => setErr("")}
                        value={loginData.password}
                        onChange={changeHandler}
                        className="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                      <button
                        className="absolute top-3 right-5 cursor-pointer"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPassword(!password);
                        }}
                      >
                        {password ? <FaRegEyeSlash /> : <IoEyeOutline />}
                      </button>{" "}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center items-start justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    onClick={handleLogin}
                    className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                    ${isLoggingIn ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? "Signing In...." : "Sign in"}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account yet?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Log_In_Page;
