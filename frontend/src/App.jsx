import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function Layout() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-[#0a051a] text-white">
      {!hideNavAndFooter && <Navbar />}

      <div className="flex-grow">

        <Routes>
          {/* FIX: Change Navbar to Home here */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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