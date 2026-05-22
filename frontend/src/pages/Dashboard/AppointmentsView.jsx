import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Plus, Clock, Video, MapPin } from "lucide-react";

const SLOTS = [
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
];

const AppointmentsView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Appointments Scheduling</h1>
            <p className="text-gray-400 text-xs mt-1">
              Review active availability nodes and client bookings.
            </p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-500 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-600/10">
            <Plus size={14} /> New Appointment
          </button>
        </div>

        {/* Available Slots Header Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Available Slots Today
          </h3>
          <div className="flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                className="bg-white/5 border border-white/10 hover:border-orange-500 hover:text-orange-400 px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stack list */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">
            Today
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="text-center font-mono border-r border-white/10 pr-4">
                <span className="text-2xl font-bold block">2</span>
                <span className="text-[10px] uppercase text-gray-500">PM</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Lisa Park</h4>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                  Strategy Call · <Clock size={12} /> 30 min ·{" "}
                  <Video size={12} /> Video Meeting
                </p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Confirmed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppointmentsView;
