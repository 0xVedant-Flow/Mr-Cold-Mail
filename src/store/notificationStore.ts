import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    { id: '1', message: 'Your campaign "Q4 Outreach" is performing well!', read: false },
    { id: '2', message: 'New lead added: David Miller', read: true },
  ],
  addNotification: (message) => set((state) => ({ notifications: [{ id: Date.now().toString(), message, read: false }, ...state.notifications] })),
  markAsRead: (id) => set((state) => ({ notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n) })),
}));
