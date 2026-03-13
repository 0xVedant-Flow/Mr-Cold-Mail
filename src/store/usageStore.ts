import { create } from 'zustand';

interface EmailHistory {
  id: string;
  leadId?: string;
  subject: string;
  body: string;
  createdAt: string;
}

interface UsageState {
  emailsGenerated: number;
  plan: 'free' | 'pro' | 'agency';
  limit: number;
  history: EmailHistory[];
  incrementUsage: () => void;
  setPlan: (plan: 'free' | 'pro' | 'agency') => void;
  saveEmailHistory: (subject: string, body: string, leadId?: string) => void;
}

export const useUsageStore = create<UsageState>((set) => ({
  emailsGenerated: 12,
  plan: 'free',
  limit: 20,
  history: [],
  incrementUsage: () => set((state) => ({ emailsGenerated: state.emailsGenerated + 1 })),
  setPlan: (plan) => {
    let limit = 20;
    if (plan === 'pro') limit = 1000;
    if (plan === 'agency') limit = 5000;
    set({ plan, limit });
  },
  saveEmailHistory: (subject, body, leadId) => set((state) => ({
    history: [{
      id: crypto.randomUUID(),
      leadId,
      subject,
      body,
      createdAt: new Date().toISOString()
    }, ...state.history]
  })),
}));
