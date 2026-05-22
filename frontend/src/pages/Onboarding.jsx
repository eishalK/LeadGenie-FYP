import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFeatures } from "../redux/featuresSlice";
import {
  Users,
  Layers,
  Calendar,
  Mail,
  Sparkles,
  BarChart3,
  TrendingUp,
  Globe,
  ArrowRight,
  CheckSquare,
  Square,
} from "lucide-react";
import toast from "react-hot-toast";

// Updated to exactly match all 8 functionalities from your document
const AVAILABLE_FEATURES = [
  {
    id: "crm",
    title: "1. Customer Relationship Management (CRM)",
    desc: "Store customer information like name, contact details, and interaction history to easily track leads and follow up.",
    icon: Users,
  },
  {
    id: "funnels",
    title: "2. Landing Page & Funnel Builder",
    desc: "Create simple landing pages with forms to promote products. Form submissions are automatically saved to the CRM.",
    icon: Layers,
  },
  {
    id: "appointments",
    title: "3. Appointment Booking System",
    desc: "Set available meeting times so customers can schedule slots using a booking link, preventing double booking.",
    icon: Calendar,
  },
  {
    id: "email_marketing",
    title: "4. Email Communication",
    desc: "Send automated or broadcast emails directly from the platform for promotions, updates, and reminders.",
    icon: Mail,
  },
  {
    id: "ai_writer",
    title: "5. AI Content Generator",
    desc: "Generate high-converting marketing texts and copy templates for emails, advertisements, or social posts.",
    icon: Sparkles,
  },
  {
    id: "analytics",
    title: "6. Smart Funnel Analyzer",
    desc: "Analyze performance metrics on visitors versus form signups to see if campaigns are truly effective.",
    icon: BarChart3,
  },
  {
    id: "suggestions",
    title: "7. Self-Optimizing Campaign Suggestions",
    desc: "Compare different marketing campaigns to provide clear, proactive automated improvement tips.",
    icon: TrendingUp,
  },
];

const Onboarding = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleFeature = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isAllSelected = selectedIds.length === AVAILABLE_FEATURES.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(AVAILABLE_FEATURES.map((f) => f.id));
    }
  };

  const handleContinue = () => {
    if (selectedIds.length === 0) {
      toast.error("Please pick at least one feature to customize your space!");
      return;
    }

    dispatch(setFeatures(selectedIds));
    toast.success("Workspace configured successfully!");
    navigate("/payment-plan");
  };

  return (
    <div className="min-h-screen bg-[#0a051a] flex items-center justify-center p-6 md:p-12 text-white">
      <div className="max-w-5xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          {/* STEP TRACKER TAG ADDED HERE */}
          <span className="text-xs font-mono uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full inline-block">
            Step 1 of 2: Select Features
          </span>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Customize Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
              LeadGenie
            </span>{" "}
            Workspace
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Select the core functionalities you want active. Your dashboard
            layout will adapt dynamically to display only your selected modules.
          </p>
        </div>

        {/* Select All Toggle */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={handleSelectAll}
            className="flex items-center gap-2.5 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
          >
            {isAllSelected ? (
              <CheckSquare size={18} className="text-orange-500" />
            ) : (
              <Square size={18} />
            )}
            {isAllSelected
              ? "Deselect All Functionalities"
              : "Select All Functionalities"}
          </button>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300 font-mono">
            {selectedIds.length} / 7 Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AVAILABLE_FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            const isSelected = selectedIds.includes(feature.id);

            return (
              <div
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                  isSelected
                    ? "bg-gradient-to-br from-purple-900/40 to-orange-900/10 border-orange-500/80 shadow-lg shadow-orange-500/5"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <div
                  className={`p-3 rounded-xl transition-colors duration-300 ${
                    isSelected
                      ? "bg-orange-600 text-white"
                      : "bg-white/5 text-gray-400 group-hover:text-white"
                  }`}
                >
                  <IconComponent size={20} />
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-semibold text-base mb-1 transition-colors ${
                      isSelected
                        ? "text-orange-400"
                        : "text-white group-hover:text-orange-400"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleContinue}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-3 text-base shadow-xl shadow-orange-600/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
