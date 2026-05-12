import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        // "fixed top-0 w-full" ensures it sticks to the very top without gaps
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a051a]/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Left: Logo Section */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <img 
                        src="/logo.png" 
                        alt="LeadGenie Logo" 
                        className="w-8 h-8 object-contain" 
                    />
                    <span className="text-white font-bold text-xl tracking-tight">LeadGenie</span>
                </Link>

                {/* Center: Navigation Links (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-10">
                    <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</a>
                    <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Pricing</a>
                    <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact</a>
                </div>

                {/* Right: Authentication Buttons */}
                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                        Sign In
                    </Link>
                    <Link to="/signup" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform active:scale-95">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;