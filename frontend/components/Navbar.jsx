import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-red-100 to-blue-500 text-white  flex g-2 justify-between items-center p-4">
      <h1 className="genos text-4xl font-medium">Paytm </h1>
      {/* <h1 className="genos text-4xl text-black font-medium"> */}
      {/* Paise Hai toh Duniya Hai
      </h1> */}
      <div className="space-x-4 flex items-center">
        {isAuthenticated ? (
          <>
            <Link to="/" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/transfer" className="hover:underline">
              Transfer
            </Link>
            <button
              onClick={logout}
              className="text-red-500 hover:underline font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <h2 className="genos hover:underline text-2xl">Signup</h2>
            </Link>
            <Link to="/signin">
              <h2 className="genos hover:underline text-2xl">Signin</h2>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
