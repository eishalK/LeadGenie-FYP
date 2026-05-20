import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { loginUser } from '../services/authService';
import toast from "react-hot-toast"; // Import toast for notifications

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // Initialize the navigate hook
    const dispatch = useDispatch();

    const inputBaseClasses = "w-full border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-base outline-none transition-all duration-300";

    const inputDynamicClasses = (value) =>
        value.length > 0
            ? "bg-white text-black border-white"
            : "bg-white/5 text-white focus:bg-white focus:text-black focus:ring-2 focus:ring-orange-500/50";

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload

        try {
            // Send login request to the backend
            const data = await loginUser({ email, password });

            toast.success("Login successful!");

            // Save user + token in Redux and localStorage
            dispatch(
                setCredentials({
                    user: data.user,
                    token: data.token,
                })
            );

            navigate('/onboarding'); // Redirect to onboarding page after successful login
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }

    };

    return (
        <div className="min-h-screen bg-[#0a051a] flex items-center justify-center p-8">
            <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[650px]">

                {/* Left Side */}
                <div className="hidden md:flex flex-col p-14 bg-gradient-to-br from-purple-900/30 to-transparent border-r border-white/10">
                    <div className="flex items-center gap-3 mb-10">
                            <img
                                src="/logo.png"
                                alt="LeadGenie Logo"
                                className="w-8 h-8 object-contain"
                            />
                            <span className="text-white font-bold text-2xl tracking-tight">LeadGenie</span>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-5xl font-bold text-white leading-tight mb-8">
                            Generate more <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Leads</span> with precision.
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Sign in to access your AI-powered marketing dashboard and scale your growth.
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col justify-center p-12 md:p-16 bg-[#0d071f]/40">
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-white mb-3">Welcome Back</h2>
                        <p className="text-gray-400 text-sm">Please enter your details to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 pl-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                                    <Mail size={20} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className={`${inputBaseClasses} ${inputDynamicClasses(email)}`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 pl-1">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                                    <Lock size={20} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`${inputBaseClasses} ${inputDynamicClasses(password)}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-orange-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-1">
                            <button type="button" className="text-xs text-orange-500 hover:text-orange-400 transition-colors">Forgot password?</button>
                        </div>

                        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 text-base shadow-xl shadow-orange-600/20 transition-all active:scale-[0.98] mt-4">
                            Sign In <ArrowRight size={20} />
                        </button>
                    </form>

                    <p className="mt-10 text-center text-gray-500 text-sm">
                        New here? <Link to="/signup" className="text-orange-500 font-semibold hover:underline">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;