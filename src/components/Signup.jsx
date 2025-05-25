import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
//import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import {toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Signup() {
  const navigate = useNavigate();
 // const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, watch, } = useForm({
    mode: "onChange", 
  });
  const password = watch("password");
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      const user = await authService.createAccount(data);
      if (user) {
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(()=>{
          navigate("/login")
        },2000)
        
      }
      // if (user) {
      //   const userData = await authService.currentUser();
      //   console.log('userData',userData)
      //   if (userData) dispatch(authLogin(userData));
      //   navigate("/");
      // }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <ToastContainer/>
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-3 border border-black`}
      >
        <div className="mb-1.5 flex justify-center">
          <span className="inline-block w-full max-w-[80px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create a new account
        </h2>
        <p className="mt-1 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-8">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(signup)} className="mt-4 ">
          <div className="space-y-3">
            <Input
              label="Name"
              type="name"
              {...register("name", { required: true })}
            />
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Password must contain at least one special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <Input
                label="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={errors.confirmPassword?.message}
              />
            <Button type="submit" className="w-full mt-4">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
