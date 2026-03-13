import { create } from 'zustand';

interface PaymentMethod {
  id: string;
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

interface PaymentState {
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: PaymentMethod) => void;
  updatePaymentMethod: (id: string, method: PaymentMethod) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  paymentMethods: [
    { id: '1', name: 'Sarah Jenkins', number: '**** **** **** 4242', expiry: '12/28', cvc: '***' }
  ],
  addPaymentMethod: (method) => set((state) => ({ paymentMethods: [...state.paymentMethods, { ...method, id: Date.now().toString() }] })),
  updatePaymentMethod: (id, method) => set((state) => ({
    paymentMethods: state.paymentMethods.map((m) => m.id === id ? { ...method, id } : m)
  })),
}));
