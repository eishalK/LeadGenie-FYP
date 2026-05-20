import React from 'react';

const RecentLeads = ({ leads }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Recent Leads</h3>
        <button className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">View All →</button>
      </div>

      {leads.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No active leads captured yet. Your system is primed and ready!</p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{lead.name}</p>
                  <p className="text-xs text-gray-400">{lead.email}</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-300 font-medium border border-white/10">
                {lead.source}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentLeads;