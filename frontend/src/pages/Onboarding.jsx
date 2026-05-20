import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFeatures } from '../redux/featuresSlice';
import { 
  Users, 
  Calendar, 
  Mail, 
  Sparkles, 
  Layers, 
  BarChart3, 
  ArrowRight, 
  CheckSquare, 
  Square 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AVAILABLE_FEATURES = [
  { id: 'crm', title: 'CRM & Contacts', desc: 'Manage customers and interactions.', icon: Users },
  { id: 'appointments', title: 'Appointments', desc: 'Online booking and scheduling.', icon: Calendar },
  { id: 'email_marketing', title: 'Email Marketing', desc: 'Send campaigns and templates.', icon: Mail },
  { id: 'ai_writer', title: 'AI Writer', desc: 'Generate high-converting marketing copy.', icon: Sparkles },
  { id: 'funnels', title: 'Funnels & Pages', desc: 'Landing pages that turn clicks into leads.', icon: Layers },
  { id: 'analytics', title: 'Analytics', desc: 'Track comprehensive ROI & performance.', icon: BarChart3 },
];

const Onboarding = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle individual item selection toggle
  const toggleFeature = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Check if everything is selected
  const isAllSelected = selectedIds.length === AVAILABLE_FEATURES.length;

  // Master checkbox toggle 
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]); // Deselect all
    } else {
      setSelectedIds(AVAILABLE_FEATURES.map(f => f.id)); // Select all
    }
  };

  const handleContinue = () => {
    if (selectedIds.length === 0) {
      toast.error("Please pick at least one feature to customize your space!");
      return;
    }
    
    // Save selections globally 
    dispatch(setFeatures(selectedIds));
    toast.success("Workspace updated successfully!");
    
    // Send to dynamic homepage/dashboard panel
    navigate('/landing');
  };

  return (
    <div className="min-h-screen bg-[#0a051a] flex items-center justify-center p-6 md:p-12 text-white">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl">
        
        {/* Header Elements */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">LeadGenie</span>!
          </h1>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Choose the core toolsets you want active on your workspace. You can change these options anytime.
          </p>
        </div>

        {/* Bulk Action Controls */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <button 
            onClick={handleSelectAll}
            className="flex items-center gap-2.5 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
          >
            {isAllSelected ? <CheckSquare size={19} className="text-orange-500" /> : <Square size={19} />}
            {isAllSelected ? "Deselect All Feature Modules" : "Select All Modules"}
          </button>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300 font-mono">
            {selectedIds.length} Selected
          </span>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid md:grid-cols-2 gap-4">
          {AVAILABLE_FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            const isSelected = selectedIds.includes(feature.id);

            return (
              <div
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-900/40 to-orange-900/10 border-orange-500/80 shadow-lg shadow-orange-500/5'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className={`p-3 rounded-xl transition-colors duration-300 ${
                  isSelected ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'
                }`}>
                  <IconComponent size={22} />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 transition-colors group-hover:text-orange-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button CTA */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleContinue}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 text-base shadow-xl shadow-orange-600/20 transition-all active:scale-[0.98]"
          >
            Configure Dashboard <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;