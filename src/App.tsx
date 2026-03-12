/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { useAuthStore } from './store/authStore';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import GenerateEmail from './pages/GenerateEmail';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import EmailEditor from './pages/EmailEditor';
import Leads from './pages/Leads';
import Templates from './pages/Templates';
import Analytics from './pages/Analytics';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-white">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/generate" element={<ProtectedRoute><GenerateEmail /></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/campaigns/create" element={<ProtectedRoute><CreateCampaign /></ProtectedRoute>} />
        <Route path="/campaigns/:id/editor" element={<ProtectedRoute><EmailEditor /></ProtectedRoute>} />
        <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
        <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
