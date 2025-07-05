import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import Transfer from "../pages/Transfer";
import { useAuth } from "../context/Authcontext";
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route
          path="/transfer"
          element={isAuthenticated ? <Transfer /> : <Navigate to="/signin" />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
