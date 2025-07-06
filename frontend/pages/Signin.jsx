import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://paytm-backend-9epc.onrender.com/api/v1/user/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Signin failed");

      login(json.token);
      toast.success("Signed in!");
      navigate("/");
    } catch {
      toast.error("Signin failed");
    }
  };

  return (
    <div>
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-xl text-red-100 font-bold mb-4 genos">Signin</h2>
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

          <button type="submit" className="bg-black text-white px-4 py-2">
            Signin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
