import { motion } from 'motion/react';
import { Mail, Users, Send, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const STATS = [
  {
    title: 'Total Emails Generated',
    value: '12,450',
    icon: Mail,
    trend: '+14.5%',
    isPositive: true,
    desc: 'vs last month'
  },
  {
    title: 'Total Leads Processed',
    value: '8,234',
    icon: Users,
    trend: '+22.1%',
    isPositive: true,
    desc: 'vs last month'
  },
  {
    title: 'Active Campaigns',
    value: '24',
    icon: Send,
    trend: '+4',
    isPositive: true,
    desc: 'vs last month'
  },
  {
    title: 'Avg. Generation Time',
    value: '1.2s',
    icon: Clock,
    trend: '-0.3s',
    isPositive: true,
    desc: 'vs last month'
  }
];

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user?.email?.split('@')[0] || 'User'}. Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, index) => (
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
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-[#1F2937] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-heading font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                    <SparklesIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Generated 50 emails for "Q3 SaaS Outreach"</p>
                    <p className="text-xs text-slate-400">2 hours ago</p>
                  </div>
                </div>
              ))}
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
              <Link to="/analytics" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-left">
                <div>
                  <p className="text-sm font-medium text-white">View Analytics</p>
                  <p className="text-xs text-slate-400">Check campaign performance</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
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
