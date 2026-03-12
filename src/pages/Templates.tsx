import { motion } from 'motion/react';
import { FileText, ArrowRight, Copy } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { Link } from 'react-router-dom';

const TEMPLATES = [
  {
    id: 1,
    title: 'SaaS Outreach',
    description: 'Perfect for B2B SaaS companies targeting decision makers.',
    preview: 'Hi {{firstName}},\n\nI noticed that {{companyName}} is growing rapidly. As you scale, managing {{painPoint}} often becomes a bottleneck.\n\nWe help companies like yours automate this process, saving an average of 10 hours per week.\n\nOpen to a quick chat next Tuesday?',
    category: 'Sales'
  },
  {
    id: 2,
    title: 'Agency Outreach',
    description: 'Designed for agencies pitching services to e-commerce brands.',
    preview: 'Hi {{firstName}},\n\nLoved your recent campaign for {{productName}}. Your brand is doing great work in the {{industry}} space.\n\nWe specialize in helping brands like {{companyName}} increase their ROAS by 30% through data-driven creative.\n\nWould you be open to seeing a few ideas we put together for you?',
    category: 'Agency'
  },
  {
    id: 3,
    title: 'Startup Founder Outreach',
    description: 'Direct and concise approach for busy founders.',
    preview: 'Hi {{firstName}},\n\nCongrats on the recent {{recentMilestone}} at {{companyName}}!\n\nI know you are busy, so I will keep this brief. We built a tool that solves {{specificProblem}} for early-stage startups.\n\nAre you currently looking for solutions in this area?',
    category: 'Networking'
  },
  {
    id: 4,
    title: 'LinkedIn Follow Up',
    description: 'Follow up email after connecting on LinkedIn.',
    preview: 'Hi {{firstName}},\n\nGreat connecting with you on LinkedIn earlier this week. I really enjoyed your post about {{postTopic}}.\n\nI wanted to reach out here because I think there might be some synergy between what you are doing at {{companyName}} and our work at {{myCompany}}.\n\nDo you have 10 minutes next week to connect?',
    category: 'Follow Up'
  },
  {
    id: 5,
    title: 'Cold Intro Email',
    description: 'A standard, highly effective cold introduction.',
    preview: 'Hi {{firstName}},\n\nI am reaching out because I saw that you lead the {{departmentName}} team at {{companyName}}.\n\nWe help teams like yours achieve {{desiredOutcome}} without {{commonObjection}}.\n\nIf this is a priority for you right now, I would love to share how we helped {{competitorName}} achieve similar results.\n\nBest,\n{{myName}}',
    category: 'General'
  }
];

export default function Templates() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Templates</h1>
            <p className="text-slate-400">Start your campaigns faster with proven email templates.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1F2937] border border-white/10 rounded-2xl p-6 flex flex-col hover:border-white/20 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
                  {template.category}
                </span>
              </div>
              
              <h3 className="text-lg font-heading font-bold text-white mb-2">{template.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">{template.description}</p>
              
              <div className="bg-[#111827] rounded-xl p-4 mb-6 relative group/preview">
                <p className="text-sm text-slate-300 whitespace-pre-wrap font-mono text-xs opacity-70 line-clamp-4">
                  {template.preview}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent flex items-end justify-center pb-2 opacity-0 group-hover/preview:opacity-100 transition-opacity">
                  <button className="flex items-center gap-2 text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 backdrop-blur-sm hover:bg-blue-500/20 transition-colors">
                    <Copy className="w-3 h-3" /> Preview Full
                  </button>
                </div>
              </div>

              <Link 
                to={`/generate?template=${template.id}`}
                className="w-full py-2.5 rounded-xl border border-white/10 text-white font-medium text-center hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group-hover:border-blue-500/50 group-hover:text-blue-400"
              >
                Use Template <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
