import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import Landing from './pages/LandingPage/Landing';


function Layout() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/onboarding' || location.pathname === '/landing'; 
  return (
    <div className="min-h-screen bg-[#0a051a] text-white flex flex-col"> 
      {!hideNavAndFooter && <Navbar />}

      <div className="flex-grow flex flex-col">

        <Routes>
          {/* FIX: Change Navbar to Home here */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/landing" element={<Landing />} />

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