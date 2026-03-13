export interface Lead {
  id: string;
  user_id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  email: string;
  status: 'New' | 'Contacted' | 'Replied' | 'Bounced' | 'Unsubscribed';
  created_at: string;
}

export interface Template {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  usage_count: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  plan: 'free' | 'pro' | 'agency';
  subscription_status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'none';
  created_at: string;
}
