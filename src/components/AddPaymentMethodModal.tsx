import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { usePaymentStore } from '../store/paymentStore';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: { id: string; name: string; number: string; expiry: string; cvc: string };
}

export default function AddPaymentMethodModal({ isOpen, onClose, initialData }: AddPaymentMethodModalProps) {
  const [formData, setFormData] = useState({ name: '', number: '', expiry: '', cvc: '' });
  const { addPaymentMethod, updatePaymentMethod } = usePaymentStore();

  useEffect(() => {
    if (initialData) {
      setFormData({ name: initialData.name, number: initialData.number, expiry: initialData.expiry, cvc: initialData.cvc });
    } else {
      setFormData({ name: '', number: '', expiry: '', cvc: '' });
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    if (initialData) {
      updatePaymentMethod(initialData.id, { id: initialData.id, ...formData });
    } else {
      addPaymentMethod({ id: '', ...formData });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1F2937] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading font-bold text-white">{initialData ? 'Edit Payment Method' : 'Add Payment Method'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Cardholder Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white" 
          />
          <input 
            type="text" 
            placeholder="Card Number" 
            value={formData.number}
            onChange={(e) => setFormData({...formData, number: e.target.value})}
            className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white" 
          />
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="MM/YY" 
              value={formData.expiry}
              onChange={(e) => setFormData({...formData, expiry: e.target.value})}
              className="w-1/2 bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white" 
            />
            <input 
              type="text" 
              placeholder="CVC" 
              value={formData.cvc}
              onChange={(e) => setFormData({...formData, cvc: e.target.value})}
              className="w-1/2 bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white" 
            />
          </div>
          <button 
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:shadow-lg transition-all"
          >
            {initialData ? 'Save Changes' : 'Add Card'}
          </button>
        </div>
      </div>
    </div>
  );
}
