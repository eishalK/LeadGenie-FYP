import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Phone,
  User,
  Hash,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const PaymentPlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null); // 'free' or 'pro'
  const [showForm, setShowForm] = useState(false);

  // EasyPaisa Form Fields State
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true); // Both plans now route to the payment verification form
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!accountName || !phoneNumber || !transactionId) {
      toast.error("Please fill in all transaction verification fields.");
      return;
    }

    if (selectedPlan === "free") {
      toast.success("1-Year Starter Plan Activated Successfully!");
    } else {
      toast.success("Pro Upgrade Successful! Welcome to LeadGenie Pro.");
    }

    navigate("/landing");
  };

  return (
    <div className="min-h-screen bg-[#0a051a] text-white flex items-center justify-center p-6 md:p-12">
      <div className="max-w-4xl w-full space-y-8">
        {/* Progress Tracker Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
            Step 2 of 2: Select a Plan
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
              Growth Plan
            </span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Unlock the right tools to automate operations and scale your small
            business effortlessly.
          </p>
        </div>

        {!showForm ? (
          /* TIER SELECTION GRID */
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-4">
            {/* Free Tier Card (1-Year Starter Plan) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">1-Year Starter Plan</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Free access for a full year to explore core tools.
                  </p>
                </div>
                <div className="text-2xl font-bold">
                  Rs.0{" "}
                  <span className="text-xs text-gray-500 font-normal">
                    / 12 months
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-300 pt-2">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-orange-500" />
                    will be added
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-orange-500" />
                    will be added
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-orange-500" />
                    will be added
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handlePlanSelection("free")}
                className="w-full mt-8 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Select Starter Plan <ArrowRight size={16} />
              </button>
            </div>

            {/* Pro Tier Card */}
            <div className="bg-gradient-to-b from-purple-900/30 to-orange-900/10 border-2 border-orange-500/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl shadow-orange-500/5 relative">
              <span className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full tracking-wider flex items-center gap-1">
                <Sparkles size={10} /> Popular
              </span>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-orange-400">
                    Pro Scale Plan
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Complete autonomous marketing engine.
                  </p>
                </div>
                <div className="text-2xl font-bold text-white">
                  Rs.2,900{" "}
                  <span className="text-xs text-gray-500 font-normal">
                    / month
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-300 pt-2">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-orange-500" /> Unlimited
                    CRM & Form Entries
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-orange-500" /> Uncapped AI
                    Copywriting Engine
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-orange-500" /> Autonomous
                    Competitor Scraper
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-orange-500" /> Campaign
                    Optimization Signals
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handlePlanSelection("pro")}
                className="w-full mt-8 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Upgrade to Pro <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* INTERACTIVE EASYPAISA TRANSACTION VERIFICATION FORM */
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1da94d]" />{" "}
                  EasyPaisa Checkout
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {selectedPlan === "free"
                    ? "Starter Activation — Rs. 0 (Verification Only)"
                    : "Pro Scale Subscription — Rs. 8,000 /mo equivalent"}
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
              >
                Change Plan
              </button>
            </div>

            {/* Instruction Callout for the User */}
            <div className="bg-[#1da94d]/10 border border-[#1da94d]/30 text-gray-300 rounded-xl p-3.5 text-xs leading-relaxed">
              <span className="font-bold text-[#1da94d] block mb-1">
                💡 Instructions:
              </span>
              Please transfer the amount to EasyPaisa Till ID / Account:{" "}
              <span className="font-mono text-white bg-white/10 px-1 py-0.5 rounded">
                03001234567
              </span>
              . Enter the sender details and transaction reference code below to
              finalize initialization.
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {/* Account Name */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 pl-1">
                  EasyPaisa Account Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="e.g. Hania Shafiq"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all text-white"
                  />
                </div>
              </div>

              {/* Mobile Account Number */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 pl-1">
                  EasyPaisa Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength="11"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="03XXXXXXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all text-white font-mono"
                  />
                </div>
              </div>

              {/* Transaction Reference ID (TRX ID) */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 pl-1">
                  Transaction ID (Txn ID)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Hash size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. 15487963254"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all text-white font-mono"
                  />
                </div>
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-600/20 active:scale-[0.98] mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                Verify & Activate Account <ArrowRight size={16} />
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium pt-2 border-t border-white/5">
              <ShieldCheck size={14} className="text-emerald-500" /> Secured
              mock verification active.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPlan;
