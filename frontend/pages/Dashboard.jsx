import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    firstname: "",
    username: "",
    accountId: "",
  });

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          "https://paytm-backend-9epc.onrender.com/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const mydata = await fetch(
          "https://paytm-backend-9epc.onrender.com/api/v1/user/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const mydatajson = await mydata.json();
        const json = await res.json();
        if (mydata.ok) setUser(mydatajson);
        if (res.ok) setBalance(json.balance);
      } catch (error) {
        toast.error;
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="relative min-h-screen  flex items-center justify-center px-4 overflow-hidden bg-[#0f0c29]">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#302b63,_#0f0c29_60%)] opacity-90 z-0"></div>

      {/* Animated Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] z-0 animate-fadeIn"></div>

      {/* Foreground Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-10 animate-fadeIn">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight mb-1">
            Hello,{" "}
            <span className="text-white">{user.firstname || "User"}</span>
          </h2>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-6 bg-white/20 rounded w-2/3"></div>
            <div className="h-4 bg-white/10 rounded w-1/3"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="text-white font-bold">Current Balance --</span>
              <span className="text-2xl font-semibold text-green-400 tracking-wider">
                ₹{balance?.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-white font-bold">
              <p>
                Username: <span className="text-white">{user.username}</span>
              </p>
              <p>
                Account ID: <span className="text-white">{user.accountId}</span>
              </p>
            </div>
            <div className="pt-4 text-center">
              <h3 className="text-md text-gray-300 mb-2">Your QR Code</h3>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  user.username || "no-id"
                )}`}
                alt="User QR"
                className="mx-auto rounded-lg bg-white p-2 shadow-md"
              />
              <p className="text-lg text-white mt-1">
                Scan this to pay {user.firstname}
              </p>
            </div>
            {user.username && (
              <button
                onClick={() => {
                  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${user.username}`;
                  fetch(qrURL)
                    .then((res) => res.blob())
                    .then((blob) => {
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${user.username}_qr.png`;
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                    });
                }}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow transition-all duration-300"
              >
                Download QR Code
              </button>
            )}

            <div className="pt-6">
              <Link
                to="/transfer"
                className="block w-full bg-red-200 hover:bg-red-300 text-black py-2 rounded-xl shadow-lg transition-all duration-300 text-center"
              >
                Transfer Money
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
