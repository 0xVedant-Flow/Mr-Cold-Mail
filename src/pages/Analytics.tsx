import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, Mail, MousePointer2, Calendar, Download, ChevronDown, Loader2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { cn } from '../components/DashboardLayout';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Lead } from '../types';

export default function Analytics() {
  const { user } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('All Time');

  useEffect(() => {
    if (!user) return;

    fetchLeads();

    // Set up real-time subscription
    const channel = supabase
      .channel('leads-analytics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const total = leads.length;
    const contacted = leads.filter(l => l.status === 'Contacted').length;
    const replied = leads.filter(l => l.status === 'Replied').length;
    const sent = contacted + replied;
    
    const replyRate = sent > 0 ? ((replied / sent) * 100).toFixed(1) : '0';
    const openRate = total > 0 ? (((contacted + replied) / total) * 100).toFixed(1) : '0';

    return [
      { label: 'Total Sent', value: sent.toLocaleString(), trend: '+0%', icon: Mail, color: 'text-blue-400' },
      { label: 'Open Rate', value: `${openRate}%`, trend: '+0%', icon: MousePointer2, color: 'text-emerald-400' },
      { label: 'Reply Rate', value: `${replyRate}%`, trend: '+0%', icon: TrendingUp, color: 'text-purple-400' },
      { label: 'Total Leads', value: total.toLocaleString(), trend: '+0%', icon: Users, color: 'text-amber-400' },
    ];
  }, [leads]);

  const chartData = useMemo(() => {
    const days: { [key: string]: { name: string, sent: number, replied: number } } = {};
    
    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      days[dateStr] = { name: dayName, sent: 0, replied: 0 };
    }

    leads.forEach(lead => {
      const date = lead.created_at.split('T')[0];
      if (days[date]) {
        if (lead.status === 'Contacted' || lead.status === 'Replied') {
          days[date].sent += 1;
        }
        if (lead.status === 'Replied') {
          days[date].replied += 1;
        }
      }
    });

    return Object.values(days);
  }, [leads]);

  const industryData = useMemo(() => {
    const industries: { [key: string]: number } = {};
    leads.forEach(l => {
      const ind = l.industry || 'Unknown';
      industries[ind] = (industries[ind] || 0) + 1;
    });

    return Object.entries(industries)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [leads]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Analytics</h1>
            <p className="text-slate-400">Track your outreach performance and conversion rates.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F2937] border border-white/10 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <Calendar className="w-4 h-4" />
                {timeRange}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1F2937] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-heading font-bold text-white mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-[#1F2937] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-heading font-bold text-white">Outreach Performance (Last 7 Days)</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-slate-400">Sent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-slate-400">Replied</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorReplied" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sent" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorSent)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="replied" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorReplied)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Chart */}
          <div className="bg-[#1F2937] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-heading font-bold text-white mb-8">Leads by Industry</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-slate-500 text-center">Top industries in your lead database.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
