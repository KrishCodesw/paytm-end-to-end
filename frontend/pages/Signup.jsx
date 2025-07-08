import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Improved validation schema with custom messages
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://paytm-backend-9epc.onrender.com/api/v1/user/signup",
        data
      );

      toast.success("Signup successful");
      navigate("/signin");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-white animate-fadeIn">
        <h2 className="text-3xl font-extrabold tracking-tight mb-6 text-center">
          Create Your Account
        </h2>
        <p className="text-sm text-center text-white/80 mb-6">
          Your account will automatically be generated with an initial balance
          between INR 0–10,000, based on your{" "}
          <span className="italic">past Karma</span> with people. <br />
          This project is an attempt to apply my knowledge of{" "}
          <strong>React</strong>, <strong>Tailwind CSS</strong>,
          <strong>HTTP servers</strong>, <strong>MongoDB transactions</strong>,{" "}
          <strong>QR code integration</strong>, and{" "}
          <strong>authentication</strong>.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("username")}
              placeholder="Username-Should be an email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center bg-white/20 border border-white/30 rounded-lg overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className="w-full px-4 py-2 bg-transparent text-white placeholder-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-blue-300 hover:text-blue-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("firstname")}
              placeholder="First Name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstname && (
              <p className="text-red-400 text-sm mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("lastname")}
              placeholder="Last Name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastname && (
              <p className="text-red-400 text-sm mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            } text-white font-semibold py-2 rounded-lg transition-all duration-300`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
