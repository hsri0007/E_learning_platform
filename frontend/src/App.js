import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StripeAccount from "./pages/StripeAccount";

function App() {
  const stripe_url = `pk_test_51KPjxhSCb4G9JP8oLPFBWa0erXJrslVkIc6wgH0z53Qy6kfSKAaL0UoA7RPrXcrtrTevIuRRnLqmZryTCmtY9hyU00ojpGNSTu`;
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stripe/callback" element={<StripeAccount />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
