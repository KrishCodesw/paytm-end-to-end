import React from "react";
import { useState, useEffect } from "react";
const Dashboard = () => {
  const [balance, setBalance] = useState();
  const [user, setUser] = useState({
    firstname: "",
    username: "",
    accountId: "",
  });

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://paytm-backend-9epc.onrender.com/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const mydata = await fetch(
        "hhttps://paytm-backend-9epc.onrender.com/api/v1/user/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const mydatajson = await mydata.json();
      if (mydata.ok) setUser(mydatajson);
      const json = await res.json();
      if (res.ok) setBalance(json.balance);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <div className="p-8">
        <h2 className="text-xl text-white font-bold mb-4">Dashboard</h2>
        <h1 className="text-2xl text-white font-bold">
          Welcome, {user.firstname}
        </h1>
        {balance === null ? (
          <p className="text-xl text-white font-bold mb-4">Loading...</p>
        ) : (
          <p className="text-xl text-white font-bold mb-4">
            Your current balance : ₹{balance}
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
