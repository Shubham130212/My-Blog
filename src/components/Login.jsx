import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  {
    /** register and handleSubmit are events */
  }
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); // Clear previous error message
    try {
      // find a session
      const session = await authService.Login(data);
      if (session) {
        const userData = await authService.currentUser();
        console.log('userData',userData)
        if (userData) {
          dispatch(authLogin(userData))
          toast.success("Login Successfully !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate("/all-post");
          }, 2000)
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <ToastContainer />
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-4 border border-black`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign up
            </Link>
          </p>
          {error && <p className="text-red-500 text-center mt-8">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit(login)} className="mt-8 ">
            <div className="space-y-4">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Invalid email address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                {...register("password", { required: true })}
              />
              <Button type="submit" className="w-full mt-4">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
