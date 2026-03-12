import React from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, Check } from 'lucide-react';

export default function CreateCampaign() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060D1A] text-[#E2E8F0] font-sans">
      {/* TopNavigation */}
      <nav className="border-b border-slate-800/30 bg-[#0A1528]/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#00D4FF] to-[#0077FF] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">❄</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Mr. Cold Mail</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-[#00D4FF]/20"></div>
        </div>
      </nav>

      {/* MainContent */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="max-w-4xl w-full">
          {/* StepIndicator */}
          <div className="mb-12 flex justify-between items-center relative">
            {/* Connector Lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 -z-10"></div>
            <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-[#00D4FF] -translate-y-1/2 -z-10"></div>
            
            {/* Step 1 (Done) */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#00D4FF] flex items-center justify-center text-[#060D1A] ring-4 ring-[#060D1A]">
                <Check className="w-6 h-6" />
              </div>
              <span className="mt-2 text-sm font-medium text-[#00D4FF]">Setup</span>
            </div>
            
            {/* Step 2 (Active) */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#0A1528] border-2 border-[#00D4FF] flex items-center justify-center text-[#00D4FF] ring-4 ring-[#060D1A]">
                <span className="font-bold">2</span>
              </div>
              <span className="mt-2 text-sm font-bold text-white">Upload</span>
            </div>
            
            {/* Step 3 (Pending) */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#0A1528] border-2 border-slate-800 flex items-center justify-center text-slate-500 ring-4 ring-[#060D1A]">
                <span className="font-bold">3</span>
              </div>
              <span className="mt-2 text-sm font-medium text-slate-500">Configure</span>
            </div>
          </div>

          {/* WizardCard */}
          <div className="bg-[#0A1528] border border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold text-white mb-2">Import your leads</h1>
              <p className="text-slate-400 mb-8">Upload your CSV file to populate your campaign with prospects.</p>
              
              {/* UploadZone */}
              <div className="relative group">
                <div className="border-2 border-dashed border-slate-700/50 group-hover:border-[#00D4FF]/50 transition-colors rounded-xl p-12 flex flex-col items-center justify-center bg-[#060D1A]/30 cursor-pointer">
                  <div className="w-16 h-16 mb-4 bg-[#00D4FF]/10 rounded-full flex items-center justify-center text-[#00D4FF]">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Drag your CSV here</h3>
                  <p className="text-slate-500 text-sm mb-6">or click to browse from your computer</p>
                  <button className="text-[#00D4FF] border border-[#00D4FF]/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00D4FF]/10 transition-colors">
                    Download Template CSV
                  </button>
                </div>
              </div>

              {/* PreviewSection */}
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Preview Parsed Data</h4>
                  <div className="flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-green-500 text-xs font-bold uppercase tracking-tight">12 valid leads ready</span>
                  </div>
                </div>
                
                {/* Data Table */}
                <div className="overflow-hidden border border-slate-800/30 rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#060D1A]/50 border-b border-slate-800/30">
                        <tr>
                          <th className="px-4 py-3 font-medium text-slate-400">Name</th>
                          <th className="px-4 py-3 font-medium text-slate-400">Email</th>
                          <th className="px-4 py-3 font-medium text-slate-400">Company</th>
                          <th className="px-4 py-3 font-medium text-slate-400">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/20">
                        <tr>
                          <td className="px-4 py-3 text-slate-200">Sarah Jenkins</td>
                          <td className="px-4 py-3 text-slate-400">sarah@nexustech.io</td>
                          <td className="px-4 py-3 text-slate-400">Nexus Tech</td>
                          <td className="px-4 py-3 text-slate-400">CMO</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-200">Marcus Thorne</td>
                          <td className="px-4 py-3 text-slate-400">m.thorne@innovate.com</td>
                          <td className="px-4 py-3 text-slate-400">Innovate Co</td>
                          <td className="px-4 py-3 text-slate-400">Founder</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-200">Leila Chen</td>
                          <td className="px-4 py-3 text-slate-400">leila@chencreative.com</td>
                          <td className="px-4 py-3 text-slate-400">Chen Creative</td>
                          <td className="px-4 py-3 text-slate-400">Head of Growth</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            {/* WizardFooter */}
            <div className="bg-[#060D1A]/50 px-8 py-6 flex justify-between items-center border-t border-slate-800/30">
              <Link to="/dashboard" className="text-slate-400 font-medium hover:text-white transition-colors">
                Back to Setup
              </Link>
              <Link to="/campaigns/1/editor" className="bg-gradient-to-r from-[#00D4FF] to-[#0077FF] text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-[#00D4FF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all inline-block">
                Continue
              </Link>
            </div>
          </div>
          
          <p className="text-center mt-8 text-slate-500 text-xs">
            Need help? <a href="#" className="text-[#00D4FF] underline">Read our guide on CSV formatting</a>
          </p>
        </div>
      </main>
    </div>
  );
}
