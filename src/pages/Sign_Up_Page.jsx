import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/authSignUpSlice";
import Login_Image from "/Login_Page.webp";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Sign_Up_Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setShowPassword] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [err, setErr] = useState("");
  const [isSigninUp, setIsSigningUp] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    setIsSigningUp(true);
    try {
      dispatch(signupUser(data)).then((result) => {
        if (result?.error?.message === "Rejected") {
          setErr(result.payload);
          setIsSigningUp(false);
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      setErr(error || "Failed to Signing Up. Please try again.");
    }
  };
  //console.log(watch("email")); // watch input value by passing the name of it
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

            <div className="md:w-full bg-white rounded-lg shadow-[1px_1px_20px_10px_#00000024] dark:border md:mt-0 mt-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
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
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      name="email"
                      id="email"
                      autoComplete="off"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Enter a valid email",
                        },
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    {errors.email && (
                      <div className="text-red-700 relative rounded-md text-sm bg-gray-200 p-2 mt-1 w-1/2">
                        <div className="w-5 h-5 bg-gray-200  inline-block  rotate-45 absolute -top-2 left-4"></div>
                        <span>{errors.email.message}</span>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      {...register("name", {
                        required: true,
                        maxLength: 20,
                        minLength: 3,
                      })}
                      aria-invalid={errors.name ? "true" : "false"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Bob Johnson"
                    />
                    {errors.name && (
                      <div className="text-red-700 relative rounded-md text-sm bg-gray-200 p-2 mt-1 w-1/2">
                        <div className="w-5 h-5 bg-gray-200  inline-block  rotate-45 absolute -top-2 left-4"></div>
                        <span>
                          <p>4 to 24 character.</p>
                          <p> Must begin with a letter.</p>
                          <p>Letters, numbers, underscores, hyphens allowed.</p>
                        </span>
                      </div>
                    )}
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
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/,
                            message: "Enter a valid email",
                          },
                        })}
                        aria-invalid={errors.password ? "true" : "false"}
                        className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                      {errors.password && (
                        <div className="text-red-700 relative rounded-md text-sm bg-gray-200 p-2 mt-1 w-1/2">
                          <div className="w-5 h-5 bg-gray-200  inline-block  rotate-45 absolute -top-2 left-4"></div>
                          <span>
                            <p> 6 to 20 characters.</p>
                            <p> A-Z, a-z </p>
                            <p>0-9 </p>
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        className="absolute top-3 right-5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPassword(!password);
                        }}
                      >
                        {password ? <FaRegEyeSlash /> : <IoEyeOutline />}
                      </button>{" "}
                    </div>
                  </div>
                  {/* <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div> */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSigninUp}
                    className={`w-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                    ${isSigninUp ? "opacity-50 cursor-not-allowed " : ""}
                    `}
                  >
                    {isSigninUp ? "Signing Up..." : "Sign Up"}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
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

export default Sign_Up_Page;
