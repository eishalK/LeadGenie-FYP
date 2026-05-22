import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/LandingPage/Landing";
import Onboarding from "./pages/Onboarding";
import PaymentPlan from "./pages/PaymentPlan";
import AICopywriterView from "./pages/Dashboard/AICopywriterView";
import CRMView from "./pages/Dashboard/CRMView";
import EmailMarketingView from "./pages/Dashboard/EmailMarketingView";
import AppointmentsView from "./pages/Dashboard/AppointmentsView";
import FunnelsView from "./pages/Dashboard/FunnelsView";
import AnalyticsView from "./pages/Dashboard/FullAnalyticsView";
import Deals from "./pages/Dashboard/DealsView";
import CampaignView from "./pages/Dashboard/CampaignView";

function Layout() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding" ||
    location.pathname === "/payment-plan" ||
    location.pathname === "/landing" ||
    location.pathname === "/ai-writer" ||
    location.pathname === "/crm" ||
    location.pathname === "/email-marketing" ||
    location.pathname === "/appointments" ||
    location.pathname === "/funnels" ||
    location.pathname === "/analytics" ||
    location.pathname === "/campaigns" ||
    location.pathname === "/deals";
  return (
    <div className="min-h-screen bg-[#0a051a] text-white flex flex-col">
      {!hideNavAndFooter && <Navbar />}

      <div className="flex-grow flex flex-col">
        <Routes>
          {/* FIX: Change Navbar to Home here */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/payment-plan" element={<PaymentPlan />} />
          <Route path="/ai-writer" element={<AICopywriterView />} />
          <Route path="/crm" element={<CRMView />} />
          <Route path="/email-marketing" element={<EmailMarketingView />} />
          <Route path="/appointments" element={<AppointmentsView />} />
          <Route path="/funnels" element={<FunnelsView />} />
          <Route path="/analytics" element={<AnalyticsView />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/campaigns" element={<CampaignView />} />
        </Routes>
        {!hideNavAndFooter && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
