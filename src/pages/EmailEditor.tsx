import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, Zap, BarChart2, Settings, Search, ArrowLeft, ChevronRight, ChevronLeft, CheckCircle, RefreshCw, Wand2, Bookmark, Copy } from 'lucide-react';

export default function EmailEditor() {
  return (
    <div className="bg-[#060D1A] h-screen flex overflow-hidden text-[#E2E8F0] font-sans">
      {/* Panel 1 - Navigation Sidebar */}
      <aside className="w-20 flex-shrink-0 bg-[#0A1628] border-r border-[#1E2D45] flex flex-col items-center py-6 gap-8">
        {/* Logo/Home */}
        <Link to="/dashboard" className="p-3 bg-[#00D4FF]/10 rounded-xl text-[#00D4FF] cursor-pointer hover:scale-105 transition-transform" title="Home">
          <Home className="w-8 h-8" />
        </Link>
        
        {/* Nav Icons */}
        <nav className="flex flex-col gap-6">
          <Link to="/dashboard" className="p-2 text-slate-400 hover:text-[#00D4FF] cursor-pointer" title="Dashboard">
            <LayoutDashboard className="w-6 h-6" />
          </Link>
          <div className="p-2 text-[#00D4FF] bg-[#00D4FF]/5 rounded-lg" title="Email Editor">
            <Zap className="w-6 h-6" />
          </div>
          <Link to="#" className="p-2 text-slate-400 hover:text-[#00D4FF] cursor-pointer" title="Analytics">
            <BarChart2 className="w-6 h-6" />
          </Link>
        </nav>
        
        {/* Bottom Action */}
        <Link to="/settings" className="mt-auto mb-4 p-2 text-slate-500 hover:text-white cursor-pointer" title="Settings">
          <Settings className="w-6 h-6" />
        </Link>
      </aside>

      {/* Panel 2 - Lead List Sidebar */}
      <main className="w-80 flex-shrink-0 bg-[#060D1A] border-r border-[#1E2D45] flex flex-col">
        {/* Search and Filters */}
        <div className="p-4 border-b border-[#1E2D45] space-y-4">
          <h2 className="text-lg font-semibold text-white">Leads</h2>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <Search className="h-4 w-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full bg-[#121F33] border-transparent focus:border-[#00D4FF] focus:ring-0 text-sm rounded-lg pl-10 py-2 text-slate-200 outline-none"
            />
          </div>
          <div className="flex bg-[#0A1628] p-1 rounded-lg text-xs font-medium">
            <button className="flex-1 py-1.5 bg-[#121F33] text-[#00D4FF] rounded-md shadow-sm">All</button>
            <button className="flex-1 py-1.5 text-slate-400 hover:text-slate-200">Done</button>
            <button className="flex-1 py-1.5 text-slate-400 hover:text-slate-200">Pending</button>
          </div>
        </div>
        
        {/* Lead List */}
        <div className="flex-1 overflow-y-auto">
          {/* Active Item */}
          <div className="p-4 border-b border-[#1E2D45] bg-[#00D4FF]/5 cursor-pointer border-l-2 border-l-[#00D4FF]">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-[#00D4FF]">Sarah Jenkins</span>
              <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5"></span>
            </div>
            <p className="text-xs text-slate-400">CTO at TechFlow</p>
          </div>
          
          {/* Item 2 */}
          <div className="p-4 border-b border-[#1E2D45] hover:bg-[#121F33]/50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-slate-200">David Miller</span>
              <span className="h-2 w-2 rounded-full bg-green-500 mt-1.5"></span>
            </div>
            <p className="text-xs text-slate-400">Head of Growth at SaaSify</p>
          </div>
          
          {/* Item 3 */}
          <div className="p-4 border-b border-[#1E2D45] hover:bg-[#121F33]/50 cursor-pointer transition-colors opacity-60">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-slate-200">Marcus Wright</span>
              <span className="h-2 w-2 rounded-full bg-slate-500 mt-1.5"></span>
            </div>
            <p className="text-xs text-slate-400">Founder at DesignLab</p>
          </div>
          
          {/* Item 4 */}
          <div className="p-4 border-b border-[#1E2D45] hover:bg-[#121F33]/50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-slate-200">Emily Blunt</span>
              <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5"></span>
            </div>
            <p className="text-xs text-slate-400">VP Marketing at CloudScale</p>
          </div>
        </div>
      </main>

      {/* Panel 3 - Main Editor Area */}
      <section className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Navigation */}
        <header className="h-14 border-b border-[#1E2D45] flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-1.5 hover:bg-[#121F33] rounded text-slate-400" title="Go Back">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <nav className="text-sm flex items-center gap-2">
              <span className="text-slate-500">Campaigns</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-slate-200">Q4 Outreach</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-slate-400 bg-[#121F33] px-3 py-1 rounded-full border border-[#1E2D45]">
              3 <span className="text-slate-600">of</span> 20
            </div>
            <div className="flex items-center border border-[#1E2D45] rounded-lg overflow-hidden">
              <button className="p-1.5 hover:bg-[#121F33] border-r border-[#1E2D45] text-slate-400">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-[#121F33] text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Lead Info Header */}
        <div className="bg-[#0A1628]/40 px-8 py-6 border-b border-[#1E2D45] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00D4FF] to-blue-600 flex items-center justify-center text-xl font-bold text-white">
              SJ
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-white leading-none">Sarah Jenkins</h1>
                <span className="px-2 py-0.5 bg-[#00D4FF]/20 text-[#00D4FF] text-[10px] font-bold uppercase tracking-wider rounded">TechFlow</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span>CTO</span>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <a href="#" className="text-[#00D4FF] hover:underline flex items-center gap-1">
                  techflow.io
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            Data Scraped
          </div>
        </div>

        {/* Scrollable Editor Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Field: To */}
            <div className="flex items-center border-b border-[#1E2D45] py-2 group">
              <label className="w-20 text-slate-500 text-sm font-medium">To:</label>
              <span className="text-slate-200 text-sm">sarah.jenkins@techflow.io</span>
            </div>
            
            {/* Field: Subject */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-500 text-sm font-medium">Subject Line</label>
              <input 
                type="text" 
                className="bg-[#121F33] border-[#1E2D45] focus:border-[#00D4FF] focus:ring-0 text-slate-100 rounded-lg py-2.5 px-4 text-sm w-full outline-none"
                defaultValue="Quick question about TechFlow's Q4 backend infrastructure"
              />
            </div>
            
            {/* Main Text Area */}
            <div className="relative group">
              <label className="text-slate-500 text-sm font-medium mb-2 block">Email Body</label>
              <textarea 
                className="w-full bg-[#121F33]/50 border-[#1E2D45] focus:border-[#00D4FF] focus:ring-0 text-slate-200 rounded-xl p-6 text-sm leading-relaxed min-h-[400px] resize-none outline-none"
                defaultValue={`Hi Sarah,\n\nI noticed TechFlow just expanded their engineering team in Austin—congrats on the growth!\n\nI was digging into how companies are managing their microservices orchestration lately. Given your role as CTO, I thought you might find our latest benchmark report on latency reduction relevant. It specifically highlights a few patterns that similar-scale teams have used to cut overhead by 15%.\n\nWould you be open to a 5-minute chat next week to see if these insights could apply to your current stack?\n\nBest,\nThe Mr. Cold Mail Team`}
              />
              {/* Word Count Chip */}
              <div className="absolute bottom-4 right-4 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20">
                102 WORDS
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Toolbar */}
        <footer className="h-20 bg-[#0A1628] border-t border-[#1E2D45] px-8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Regenerate */}
            <button className="p-2.5 bg-[#121F33] text-slate-300 hover:text-[#00D4FF] border border-[#1E2D45] rounded-lg transition-all" title="Regenerate AI Content">
              <RefreshCw className="w-5 h-5" />
            </button>
            
            {/* Improve Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#121F33] text-slate-300 border border-[#1E2D45] rounded-lg text-sm font-medium hover:border-slate-500">
                <span>Improve</span>
                <Wand2 className="w-4 h-4" />
              </button>
              {/* Mock Dropdown Menu */}
              <div className="hidden group-hover:block absolute bottom-full mb-2 w-40 bg-[#0A1628] border border-[#1E2D45] rounded-lg shadow-xl py-1 z-50">
                <a href="#" className="block px-4 py-2 text-xs text-slate-300 hover:bg-[#121F33] hover:text-[#00D4FF]">Make Concise</a>
                <a href="#" className="block px-4 py-2 text-xs text-slate-300 hover:bg-[#121F33] hover:text-[#00D4FF]">More Formal</a>
                <a href="#" className="block px-4 py-2 text-xs text-slate-300 hover:bg-[#121F33] hover:text-[#00D4FF]">Add Personalization</a>
              </div>
            </div>
            
            {/* Save Template */}
            <button className="p-2.5 bg-[#121F33] text-slate-300 hover:text-blue-400 border border-[#1E2D45] rounded-lg" title="Save as Template">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-slate-400 text-sm font-medium hover:text-white px-4 py-2">
              Discard
            </Link>
            <button className="border border-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.3)] bg-[#00D4FF]/10 text-[#00D4FF] font-bold px-8 py-2.5 rounded-lg hover:bg-[#00D4FF] hover:text-[#060D1A] transition-all text-sm uppercase tracking-wider">
              Copy Email
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
