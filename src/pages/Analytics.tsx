import { motion } from 'motion/react';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const emailsGeneratedData = [
  { name: 'Mon', emails: 400 },
  { name: 'Tue', emails: 300 },
  { name: 'Wed', emails: 550 },
  { name: 'Thu', emails: 200 },
  { name: 'Fri', emails: 700 },
  { name: 'Sat', emails: 100 },
  { name: 'Sun', emails: 50 },
];

const campaignPerformanceData = [
  { name: 'Q3 SaaS', sent: 400, opened: 240, replied: 100 },
  { name: 'Agency NY', sent: 300, opened: 139, replied: 80 },
  { name: 'Startup CTOs', sent: 200, opened: 98, replied: 40 },
  { name: 'Enterprise', sent: 278, opened: 190, replied: 110 },
];

const leadEngagementData = [
  { name: 'Highly Engaged', value: 400 },
  { name: 'Moderately Engaged', value: 300 },
  { name: 'Low Engagement', value: 300 },
  { name: 'Unresponsive', value: 200 },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F43F5E'];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Analytics</h1>
            <p className="text-slate-400">Track your email generation and campaign performance.</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-[#111827] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emails Generated Per Day (Line Chart) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1F2937] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white">Emails Generated Per Day</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emailsGeneratedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="emails" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#111827' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Campaign Performance (Bar Chart) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1F2937] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white">Campaign Performance</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: '#ffffff05' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                  <Bar dataKey="sent" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="opened" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="replied" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Lead Engagement (Pie Chart) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1F2937] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <PieChartIcon className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white">Lead Engagement</h3>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadEngagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {leadEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Email Response Rate (KPIs) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1F2937] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white">Email Response Rate</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 h-[300px]">
              <div className="bg-[#111827] rounded-xl p-6 flex flex-col justify-center items-center text-center border border-white/5">
                <p className="text-slate-400 text-sm font-medium mb-2">Average Open Rate</p>
                <p className="text-4xl font-bold text-white mb-2">42.8%</p>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+5.2% vs last month</span>
              </div>
              <div className="bg-[#111827] rounded-xl p-6 flex flex-col justify-center items-center text-center border border-white/5">
                <p className="text-slate-400 text-sm font-medium mb-2">Average Reply Rate</p>
                <p className="text-4xl font-bold text-white mb-2">14.2%</p>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+2.1% vs last month</span>
              </div>
              <div className="bg-[#111827] rounded-xl p-6 flex flex-col justify-center items-center text-center border border-white/5">
                <p className="text-slate-400 text-sm font-medium mb-2">Click-Through Rate</p>
                <p className="text-4xl font-bold text-white mb-2">8.5%</p>
                <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-full">-0.5% vs last month</span>
              </div>
              <div className="bg-[#111827] rounded-xl p-6 flex flex-col justify-center items-center text-center border border-white/5">
                <p className="text-slate-400 text-sm font-medium mb-2">Bounce Rate</p>
                <p className="text-4xl font-bold text-white mb-2">1.2%</p>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">-0.2% vs last month</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
