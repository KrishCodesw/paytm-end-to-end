import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  firstname: z.string(),
  lastname: z.string(),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
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
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-white animate-fadeIn">
        <h2 className="text-3xl font-extrabold tracking-tight mb-6 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center bg-white/20 border border-white/30 rounded-lg overflow-hidden">
            <input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
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

          <input
            {...register("firstname")}
            placeholder="First Name"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            {...register("lastname")}
            placeholder="Last Name"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
