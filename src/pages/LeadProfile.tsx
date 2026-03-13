import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, User, Building2, Briefcase, Loader2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { supabase } from '../lib/supabase';
import { Lead } from '../types';
import { useUsageStore } from '../store/usageStore';

export default function LeadProfile() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const { history } = useUsageStore();

  useEffect(() => {
    if (!id) return;
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching lead:', error);
    } else {
      setLead(data);
    }
    setLoading(false);
  };

  const leadHistory = history.filter(h => h.leadId === id);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (!lead) {
    return (
      <DashboardLayout>
        <div className="text-center text-slate-400">Lead not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="bg-[#1F2937] border border-white/10 rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-white mb-4">{lead.name}</h1>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {lead.email}</div>
            <div className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {lead.company}</div>
            <div className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {lead.role}</div>
            <div className="flex items-center gap-2"><User className="w-4 h-4" /> {lead.industry}</div>
          </div>
        </div>

        <div className="bg-[#1F2937] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Email History</h2>
          {leadHistory.length === 0 ? (
            <p className="text-slate-400">No emails sent to this lead yet.</p>
          ) : (
            <div className="space-y-4">
              {leadHistory.map(h => (
                <div key={h.id} className="bg-[#111827] p-4 rounded-xl border border-white/5">
                  <h3 className="font-medium text-white">{h.subject}</h3>
                  <p className="text-sm text-slate-400 mt-1">{h.body.substring(0, 100)}...</p>
                  <p className="text-xs text-slate-500 mt-2">{new Date(h.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
