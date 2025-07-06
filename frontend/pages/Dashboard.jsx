import React from "react";
import { useState, useEffect } from "react";
const Dashboard = () => {
  const [balance, setBalance] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (res.ok) setBalance(json.balance);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <div className="p-8">
        <h2 className="text-xl text-white font-bold mb-4">Dashboard</h2>
        {balance === null ? (
          <p className="text-xl text-white font-bold mb-4">Loading...</p>
        ) : (
          <p className="text-xl text-white font-bold mb-4">
            Your balance: ₹{balance}
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
