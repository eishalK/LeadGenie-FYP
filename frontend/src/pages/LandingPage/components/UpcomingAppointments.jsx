import React from 'react';
import { Calendar } from 'lucide-react';

const UpcomingAppointments = ({ appointments }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Upcoming</h3>
        <button className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">View All →</button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">Your schedule is wide open! Connect your booking links to show slots.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-white">{appt.name}</p>
                  <p className="text-xs text-gray-400">{appt.type}</p>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  appt.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {appt.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium pt-1">
                <Calendar size={13} /> {appt.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;