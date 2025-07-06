import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
const Transfer = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        console.log("Scanned:", decodedText);
        setValue("to", decodedText);
        scanner.clear();
      },
      (error) => {
        console.warn("Scan error", error);
      }
    );
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://paytm-backend-9epc.onrender.com/api/v1/account/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Transfer failed");
      toast.success("Money transferred!");
      navigate("/");
    } catch {
      toast.error("Transfer failed");
    }
  };
  return (
    <div className="p-8 max-w-md text-white mx-auto">
      <h2 className="text-xl font-bold mb-4">Transfer Money</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("to")}
          placeholder="Recipient Username"
          className="w-full p-2 border"
        />
        <input
          {...register("amount")}
          type="number"
          placeholder="Amount"
          className="w-full p-2 border"
        />
        <div id="qr-reader"></div>

        <button type="submit" className="bg-black text-white px-4 py-2">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default Transfer;
