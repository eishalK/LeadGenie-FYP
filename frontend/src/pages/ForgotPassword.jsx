import React, { useState } from 'react';
import { Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { forgotPasswordService } from '../services/authService';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await forgotPasswordService(email);
            setIsSent(true);
            toast.success("Reset link generated!");
            // Purely for development convenience:
            console.log("Development Link:", data.developmentLink);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a051a] flex items-center justify-center p-8">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                
                {!isSent ? (
                    <>
                        <p className="text-gray-400 text-sm mb-6">Enter your email and we'll send you a link to reset your password.</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500"><Mail size={20} /></span>
                                    <input
                                        type="email" required disabled={loading} value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all">
                                {loading ? "Sending..." : "Send Reset Link"} <ArrowRight size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-6 space-y-4">
                        <div className="flex justify-center text-orange-500"><CheckCircle2 size={48} /></div>
                        <p className="text-white text-base">If an account exists, a temporary setup link has been created.</p>
                        <p className="text-gray-400 text-xs">Check your email for the clickable link!</p>
                    </div>
                )}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Back to <Link to="/login" className="text-orange-500 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;