import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, MoreHorizontal, Play, Pause, Copy, Trash2, ExternalLink } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { Link } from 'react-router-dom';
import { cn } from '../components/DashboardLayout';

const CAMPAIGNS = [
  { id: 1, name: 'Q3 SaaS Outreach', leads: 450, generated: 450, status: 'Active', date: 'Oct 12, 2026' },
  { id: 2, name: 'Agency Founders NY', leads: 120, generated: 120, status: 'Completed', date: 'Oct 10, 2026' },
  { id: 3, name: 'Startup CTOs', leads: 850, generated: 340, status: 'Paused', date: 'Oct 08, 2026' },
  { id: 4, name: 'LinkedIn Follow-ups', leads: 55, generated: 55, status: 'Completed', date: 'Oct 05, 2026' },
  { id: 5, name: 'Enterprise VPs', leads: 200, generated: 0, status: 'Draft', date: 'Oct 01, 2026' },
];

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = CAMPAIGNS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Campaigns</h1>
            <p className="text-slate-400">Manage and track your email outreach campaigns.</p>
          </div>
          <Link 
            to="/campaigns/create" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Campaign
          </Link>
        </div>

        <div className="bg-[#1F2937] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-xl bg-[#111827] border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-colors">
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="text-xs text-slate-500 uppercase bg-[#111827]/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Campaign Name</th>
                  <th className="px-6 py-4 font-medium">Leads</th>
                  <th className="px-6 py-4 font-medium">Emails Generated</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Created Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCampaigns.map((campaign, idx) => (
                  <motion.tr 
                    key={campaign.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4">
                      {campaign.leads.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[100px] bg-[#111827] rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full" 
                            style={{ width: `${(campaign.generated / campaign.leads) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs">{campaign.generated}/{campaign.leads}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium border",
                        campaign.status === 'Active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        campaign.status === 'Paused' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                        campaign.status === 'Completed' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                        "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      )}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {campaign.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Open">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Duplicate">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredCampaigns.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No campaigns found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
