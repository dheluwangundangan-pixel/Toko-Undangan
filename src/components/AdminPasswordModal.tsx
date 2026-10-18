import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, KeyRound, AlertCircle } from 'lucide-react';

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPasswordModal: React.FC<AdminPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Retrieve saved password or default to 'dheluwang2026'
    const storedPin = localStorage.getItem('dheluwang_admin_pin') || 'dheluwang2026';

    setTimeout(() => {
      if (passwordInput.trim() === storedPin) {
        sessionStorage.setItem('dheluwang_admin_auth', 'true');
        setPasswordInput('');
        setErrorMessage('');
        setIsSubmitting(false);
        onSuccess();
      } else {
        setErrorMessage('Kata sandi salah. Silakan coba lagi.');
        setIsSubmitting(false);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FDFCF7] border border-[#D5C9B3] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon Monogram */}
        <div className="w-14 h-14 bg-gradient-to-tr from-[#996515] to-[#D4AF37] p-0.5 rounded-2xl mx-auto mb-4 shadow-md flex items-center justify-center">
          <div className="w-full h-full bg-[#2C2926] rounded-2xl flex items-center justify-center text-[#D4AF37]">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center mb-6">
          <h3 className="font-display text-2xl font-bold text-[#2C2926]">
            Verifikasi Keamanan
          </h3>
          <p className="text-xs text-[#6B5E50] mt-1.5 leading-relaxed">
            Masukkan kata sandi otorisasi untuk melanjutkan.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2C2926] mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Masukkan kata sandi..."
                className="w-full pl-4 pr-11 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Error Message */}
            {errorMessage && (
              <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-xl flex items-center gap-1.5 animate-in shake duration-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#996515] to-[#B8860B] hover:from-[#85530D] hover:to-[#9E7108] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isSubmitting ? 'Memeriksa...' : 'Masuk'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
