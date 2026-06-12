// src/components/Sidebar.jsx
import React, { useState } from "react"; // Added useState
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Mail,
  Sparkles,
  Layers,
  BarChart3,
  Settings,
  Menu,
  X,
  DollarSign,
  TrendingUp,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [showMenu, setShowMenu] = useState(false); // State to toggle bottom menu visibility

  const selectedFeatures =
    useSelector((state) => state.features?.selectedFeatures) || [];
  const user = useSelector((state) => state.auth?.user) || { name: "User" };
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 1. Clear state payloads from memory storage
    localStorage.removeItem("token");
    sessionStorage.clear();

    // 2. Clear Redux memory storage
    dispatch({ type: "auth/logout" });

    // 3. Force-redirect and clear lifecycle loops
    navigate("/");
  };

  const menuItems = [
    { id: "crm", title: "CRM Panel", icon: Users, path: "/crm" },
    { id: "crm", title: "Deals Pipeline", icon: DollarSign, path: "/deals" },
    {
      id: "appointments",
      title: "Appointments",
      icon: Calendar,
      path: "/appointments",
    },
    {
      id: "email_marketing",
      title: "Email Engine",
      icon: Mail,
      path: "/email-marketing",
    },
    {
      id: "ai_writer",
      title: "AI Copywriter",
      icon: Sparkles,
      path: "/ai-writer",
    },
    { id: "funnels", title: "Funnels & Pages", icon: Layers, path: "/funnels" },
    {
      id: "analytics",
      title: "Analytics View",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      id: "suggestions",
      title: "Campaign Strategy",
      icon: TrendingUp,
      path: "/campaigns",
    },
  ];

  // Fallback protection for feature routes layout testing
  const activeMenuItems =
    selectedFeatures.length > 0
      ? menuItems.filter((item) => selectedFeatures.includes(item.id))
      : menuItems;

  return (
    <aside
      className={`h-screen bg-[#0d071f]/60 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out hidden md:flex ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="space-y-8 w-full">
        <div className="flex items-center justify-between pl-2 h-9 w-full">
          <Link
            to="/landing"
            className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
          >
            <img
              src="/logo.png"
              alt="LeadGenie Logo"
              className="w-8 h-8 object-contain min-w-[32px]"
            />
            {!isCollapsed && (
              <span className="font-bold text-xl tracking-tight text-white">
                LeadGenie
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-white/5 p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="space-y-1.5 w-full">
          <Link
            to="/landing"
            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              location.pathname === "/landing"
                ? "bg-gradient-to-r from-orange-600/20 to-pink-600/5 text-orange-400 border border-orange-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard size={18} className="min-w-[18px]" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          {activeMenuItems.map((item, index) => {
            const Icon = item.icon;
            const isTabActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  isTabActive
                    ? "bg-white/5 text-white border border-white/10 font-semibold"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} className="min-w-[18px]" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Container: Action list items map dynamically below */}
      <div className="space-y-2 pt-4 border-t border-white/10 w-full relative">
        {/* Toggleable Action Buttons Container */}
        {showMenu && (
          <div className="space-y-1 transition-all duration-200 mb-2">
            <Link
              to="/onboarding"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-orange-400 hover:bg-white/5 transition-all whitespace-nowrap"
            >
              <Settings size={15} className="min-w-[15px]" />
              {!isCollapsed && <span>Customize Space</span>}
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-all whitespace-nowrap w-full text-left cursor-pointer"
            >
              <LogOut size={15} className="min-w-[15px]" />
              {!isCollapsed && <span>Logout Account</span>}
            </button>
          </div>
        )}

        {/* User Identity Toggle Button Container */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-3 pl-2 pt-2 w-full text-left whitespace-nowrap cursor-pointer hover:bg-white/5 p-1.5 rounded-xl transition-all outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center min-w-[32px] shrink-0">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          {!isCollapsed && (
            <span className="text-sm font-medium text-gray-300 truncate select-none">
              {user.name || "User"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
