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
    <div>
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-xl text-red-100 font-bold mb-4 genos">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full bg-red-100 rounded-xl p-2 border"
          />
          <div className="flex bg-red-100 rounded-xl">
            <input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2  border"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            {...register("firstname")}
            placeholder="First Name"
            className="w-full p-2 bg-red-100 rounded-xl border"
          />

          <input
            {...register("lastname")}
            placeholder="Last Name"
            className="w-full p-2 bg-red-100 rounded-xl border"
          />
          <button type="submit" className="bg-black text-white px-4 py-2">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
