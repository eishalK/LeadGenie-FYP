import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Mail,
  Sparkles,
  Layers,
  BarChart3,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const selectedFeatures = useSelector(
    (state) => state.features.selectedFeatures,
  );
  const user = useSelector((state) => state.auth?.user) || { name: "User" };
  const location = useLocation();

  const menuItems = [
    { id: "crm", title: "CRM Panel", icon: Users, path: "/crm" },
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
  ];

  // Filter items down based on user configuration
  const activeMenuItems = menuItems.filter((item) =>
    selectedFeatures.includes(item.id),
  );

  return (
    <aside className="w-64 bg-[#0d071f]/60 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between hidden md:flex">
      <div className="space-y-8">
        <div className="flex items-center gap-3 pl-2">
          <img
            src="/logo.png"
            alt="LeadGenie Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-xl tracking-tight text-white">
            LeadGenie
          </span>
        </div>

        <nav className="space-y-1.5">
          <Link
            to="/landing"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              location.pathname === "/"
                ? "bg-gradient-to-r from-orange-600/20 to-pink-600/5 text-orange-400 border border-orange-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          {activeMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <Icon size={18} /> {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/10">
        <Link
          to="/onboarding"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-orange-400 hover:bg-white/5 transition-all"
        >
          <Settings size={15} /> Customize Workspace
        </Link>
        <div className="flex items-center gap-3 pl-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center">
            {user.name[0].toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-300 truncate">
            {user.name}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
