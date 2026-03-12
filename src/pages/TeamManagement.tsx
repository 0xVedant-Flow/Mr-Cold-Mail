import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Bell, UserPlus, Trash2, X, Hourglass, Users, CheckCircle } from 'lucide-react';

export default function TeamManagement() {
  return (
    <div className="bg-[#060D1A] text-slate-100 min-h-screen font-sans">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          {/* Top Navigation Bar */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-[#1E293B] px-6 md:px-10 py-3 bg-[#0E1629]/70 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00D4FF]/20 text-[#00D4FF]">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-slate-100 text-lg font-extrabold leading-tight tracking-tight">Mr. Cold Mail</h2>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/dashboard" className="text-slate-400 hover:text-[#00D4FF] text-sm font-medium transition-colors">Dashboard</Link>
              <Link to="/campaigns/new" className="text-slate-400 hover:text-[#00D4FF] text-sm font-medium transition-colors">Campaigns</Link>
              <Link to="#" className="text-slate-400 hover:text-[#00D4FF] text-sm font-medium transition-colors">Leads</Link>
              <Link to="/settings" className="text-[#00D4FF] text-sm font-semibold transition-colors">Settings</Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#0E1629] border border-[#1E293B] text-slate-300 hover:text-[#00D4FF] transition-all">
                <Bell className="w-5 h-5" />
              </button>
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 ring-2 ring-[#00D4FF]/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlG4izQhgdDGvhuacBQ7F10D0DbgZ36D8bdbywpJt9yTi2ADO49fB3G2b1a9xrfNgfL_Xa0Ez3JOJqaPynI0Sem2xnPvbatU9rwdZya5Is_PxMPGRz7PZ8BIn-dyPHM3iDDnXejGFM5450GzGOQoDezrOQKRNsiL2ZsRj8VQNev0P2TGvmcISxUtg5CUCPcT1MHuM22IYtlpFfTFzEmBWhzHgy7a2VrkqxkaNCSyZWB-bilITSx515odOkSmrQVg7iMZbV5vPvXg")' }}></div>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 py-8">
            <div className="flex flex-col gap-8">
              {/* Sub-navigation Tabs */}
              <div className="border-b border-[#1E293B]">
                <div className="flex gap-8 overflow-x-auto pb-px">
                  <Link to="/settings" className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-400 pb-3 text-sm font-semibold hover:text-slate-200 transition-all">Profile</Link>
                  <Link to="#" className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-400 pb-3 text-sm font-semibold hover:text-slate-200 transition-all">Password</Link>
                  <Link to="/team" className="flex flex-col items-center justify-center border-b-2 border-[#00D4FF] text-[#00D4FF] pb-3 text-sm font-bold">Team</Link>
                  <Link to="#" className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-400 pb-3 text-sm font-semibold hover:text-slate-200 transition-all">Notifications</Link>
                  <Link to="/billing" className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-400 pb-3 text-sm font-semibold hover:text-slate-200 transition-all">Billing</Link>
                </div>
              </div>

              {/* Header Section */}
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-extrabold tracking-tight text-white">Team Management</h1>
                  <p className="text-slate-400 max-w-xl">Invite and manage your team members and their permissions to collaborate on your outbound outreach.</p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-gradient-to-br from-[#00D4FF] to-[#0077FF] text-white text-sm font-bold shadow-lg shadow-[#00D4FF]/20 hover:scale-[1.02] transition-transform">
                  <UserPlus className="w-5 h-5" />
                  <span>Invite Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Team List */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                  <div className="bg-[#0E1629]/70 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#0E1629]/50 border-b border-[#1E293B]">
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Leads Used</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E293B]">
                          {/* Row 1 */}
                          <tr className="hover:bg-[#00D4FF]/5 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#0E1629] border border-[#1E293B] flex items-center justify-center overflow-hidden">
                                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCobEsUXv5VWE5V2goG9eoiC6Xg2QW5vO5ua23HqcJjvEGetcVKQENwfUbhmrYDlUJbQzf6NWNwFjmizZKfrc8jSI71dc3itMsVDXIDU33c1vxmn5lwhExGiBx6jy1o90tr1mM8JTUKrnL74gjsFRfooYAkC3VrTY7Ze-XIJ1LSU7J5lYo4H6I2SyeCl8RxtJzqR0bwtK-nu9dmQ9RIjotbSxQ_rPaHmYJVZMSlIS39Uv-qpjsCXq7bMMjtCiQa8h9Y5tg-I1Hibg" alt="Team member" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white">Alex Rivera</p>
                                  <p className="text-xs text-slate-500">alex@company.com</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <select className="bg-[#0E1629] border-[#1E293B] text-slate-300 text-xs rounded-lg focus:ring-[#00D4FF] focus:border-[#00D4FF] block w-32 p-1.5 transition-all outline-none">
                                <option defaultValue="Admin">Admin</option>
                                <option>Editor</option>
                                <option>Viewer</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm font-medium text-slate-300">1,240</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-slate-500 hover:text-red-400 transition-colors">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                          
                          {/* Row 2 */}
                          <tr className="hover:bg-[#00D4FF]/5 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#0E1629] border border-[#1E293B] flex items-center justify-center overflow-hidden">
                                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBylrycH5BJfPN9KTN5zZjIJMIJG3ltdlWX3CRZM5qBPb4C6pMsySUOHgXpEqhJkU_g2jfcXohuCuc1OD8ao5sHPR-Hi_g7J6XCFF5_VBQOGJwZJnAkaOKh_iOd9eWR2ABvuir7xmkB9l-Z8GUb2skB_JWtYOXQ-WxEOwOrL0GFmbXI4pADZpx7uzGFaMUTWcOwt4_DvFnGspmHmFjdSaTvoU0SQv1ydUjDjxWuAkf-f4qpqRrlrx2aIzLxJRve5PGYh9NQvX26eA" alt="Team member" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white">Sarah Chen</p>
                                  <p className="text-xs text-slate-500">sarah@company.com</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <select className="bg-[#0E1629] border-[#1E293B] text-slate-300 text-xs rounded-lg focus:ring-[#00D4FF] focus:border-[#00D4FF] block w-32 p-1.5 transition-all outline-none">
                                <option>Admin</option>
                                <option defaultValue="Editor">Editor</option>
                                <option>Viewer</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm font-medium text-slate-300">850</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-slate-500 hover:text-red-400 transition-colors">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                          
                          {/* Row 3 (Invited) */}
                          <tr className="hover:bg-[#00D4FF]/5 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#0E1629] border border-[#1E293B] border-dashed flex items-center justify-center">
                                  <UserPlus className="w-5 h-5 text-slate-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white">Marcus Gray</p>
                                  <p className="text-xs text-slate-500">marcus@partner.io</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <select className="bg-[#0E1629] border-[#1E293B] text-slate-300 text-xs rounded-lg focus:ring-[#00D4FF] focus:border-[#00D4FF] block w-32 p-1.5 transition-all outline-none">
                                <option>Admin</option>
                                <option>Editor</option>
                                <option defaultValue="Viewer">Viewer</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-[#00D4FF]/10 text-[#00D4FF]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"></span>
                                Invited
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm font-medium text-slate-600">—</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button className="text-xs font-bold text-[#00D4FF] hover:underline">Resend</button>
                                <button className="text-slate-500 hover:text-red-400 transition-colors">
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pending Invites Section */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-white">Pending Requests</h3>
                    <div className="bg-[#0E1629]/70 backdrop-blur-md rounded-xl p-8 border-dashed border-2 border-[#1E293B] flex flex-col items-center justify-center text-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#0E1629] flex items-center justify-center text-slate-600">
                        <Hourglass className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-300">No pending external requests</p>
                        <p className="text-sm text-slate-500">When you invite users who aren't on Mr. Cold Mail yet, they'll appear here.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Stats / Usage */}
                <div className="flex flex-col gap-6">
                  {/* Seat Usage Card */}
                  <div className="bg-[#0E1629]/70 backdrop-blur-md border border-white/5 rounded-xl p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">Seat Usage</h3>
                      <Users className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-black text-white">3 <span className="text-lg text-slate-500 font-normal">/ 5 used</span></p>
                        <p className="text-xs font-bold text-[#00D4FF]">Pro Plan</p>
                      </div>
                      <div className="w-full bg-[#0E1629] rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#00D4FF] to-[#0077FF] h-full rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        You have 2 available seats left in your current plan. Upgrade to Enterprise for unlimited seats.
                      </p>
                    </div>
                    <Link to="/billing" className="w-full py-2.5 rounded-lg border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-bold hover:bg-[#00D4FF]/10 transition-colors text-center block">
                      Manage Subscription
                    </Link>
                  </div>

                  {/* Plan Limits */}
                  <div className="bg-[#0E1629]/70 backdrop-blur-md border border-white/5 rounded-xl p-6 space-y-4">
                    <h3 className="font-bold text-white text-base">Plan Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-[#00D4FF]" />
                        Shared Campaigns
                      </li>
                      <li className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-[#00D4FF]" />
                        Lead Verification
                      </li>
                      <li className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-[#00D4FF]" />
                        Role Permissions
                      </li>
                      <li className="flex items-center gap-3 text-sm text-slate-500">
                        <X className="w-4 h-4 text-slate-700" />
                        Custom Domain Branding
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer-ish padding */}
          <footer className="py-10 text-center">
            <p className="text-slate-600 text-xs">© 2024 Mr. Cold Mail SaaS. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
