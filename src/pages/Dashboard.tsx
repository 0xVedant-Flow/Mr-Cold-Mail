import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Users, Send, Clock, ArrowUpRight, ArrowDownRight, Loader2, CreditCard, Zap } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { useUsageStore } from '../store/usageStore';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { emailsGenerated, limit, plan } = useUsageStore();
  const [stats, setStats] = useState([
    { title: 'Total Emails Generated', value: '0', icon: Mail, trend: '+12%', isPositive: true, desc: 'vs last month' },
    { title: 'Total Leads Processed', value: '0', icon: Users, trend: '+18%', isPositive: true, desc: 'vs last month' },
    { title: 'Active Campaigns', value: '0', icon: Send, trend: '+4', isPositive: true, desc: 'vs last month' },
    { title: 'Avg. Generation Time', value: '1.2s', icon: Clock, trend: '-0.3s', isPositive: true, desc: 'vs last month' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetchStats();

    // Set up real-time subscription for leads and campaigns
    const leadsChannel = supabase
      .channel('dashboard-leads-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads', filter: `user_id=eq.${user.id}` },
        () => fetchStats()
      )
      .subscribe();

    const campaignsChannel = supabase
      .channel('dashboard-campaigns-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'campaigns', filter: `user_id=eq.${user.id}` },
        () => fetchStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(campaignsChannel);
    };
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch counts from Supabase
      const [leadsCount, campaignsCount, generatedEmails] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('campaigns').select('*', { count: 'exact', head: true }),
        supabase.from('campaigns').select('generated_count')
      ]);

      const totalGenerated = generatedEmails.data?.reduce((acc, curr) => acc + (curr.generated_count || 0), 0) || 0;

      setStats(prev => [
        { ...prev[0], value: totalGenerated.toLocaleString() },
        { ...prev[1], value: (leadsCount.count || 0).toLocaleString() },
        { ...prev[2], value: (campaignsCount.count || 0).toString() },
        prev[3]
      ]);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}. Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1F2937] border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full uppercase">{plan}</span>
            </div>
            <div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">Usage</h3>
              <p className="text-2xl font-bold text-white mb-1">{emailsGenerated} <span className="text-sm text-slate-500 font-normal">/ {limit}</span></p>
              <div className="w-full bg-[#111827] rounded-full h-2 mt-2 overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(emailsGenerated / limit) * 100}%` }}></div>
              </div>
            </div>
          </motion.div>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1F2937] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                ) : (
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                )}
                <p className="text-xs text-slate-500">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-[#1F2937] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-heading font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : (
                [1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                      <SparklesIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">System update completed successfully</p>
                      <p className="text-xs text-slate-400">{i * 2} hours ago</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-[#1F2937] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-heading font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/generate" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-left">
                <div>
                  <p className="text-sm font-medium text-white">Generate Emails</p>
                  <p className="text-xs text-slate-400">Start a new AI generation</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/leads" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-left">
                <div>
                  <p className="text-sm font-medium text-white">Upload Leads</p>
                  <p className="text-xs text-slate-400">Import CSV or connect CRM</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/campaigns" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-left">
                <div>
                  <p className="text-sm font-medium text-white">View Campaigns</p>
                  <p className="text-xs text-slate-400">Check campaign performance</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="bg-[#1F2937] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-white">Recent Activity</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">View all</button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, type: 'email', title: 'Email generated for Sarah Connor', time: '2 mins ago', status: 'success' },
              { id: 2, type: 'campaign', title: 'Campaign "Q1 Outreach" started', time: '1 hour ago', status: 'success' },
              { id: 3, type: 'lead', title: '150 leads imported from CSV', time: '3 hours ago', status: 'success' },
              { id: 4, type: 'billing', title: 'Subscription upgraded to Pro', time: '5 hours ago', status: 'success' },
            ].map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl bg-[#111827] border border-white/5 hover:border-white/10 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    {activity.type === 'email' && <Mail className="w-5 h-5" />}
                    {activity.type === 'campaign' && <Send className="w-5 h-5" />}
                    {activity.type === 'lead' && <Users className="w-5 h-5" />}
                    {activity.type === 'billing' && <CreditCard className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-medium text-slate-400">Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
