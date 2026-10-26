import React, { useState } from 'react';
import { INSTRUCTORS } from '../data/mockData';
import { 
  X, 
  UserCheck, 
  Calendar, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  DollarSign,
  Power
} from 'lucide-react';

export default function InstructorLoginModal({ isOpen, onClose }) {
  const [selectedInstructorId, setSelectedInstructorId] = useState(INSTRUCTORS[0].id);
  const [isAcceptingBookings, setIsAcceptingBookings] = useState(true);
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!isOpen) return null;

  const currentInstructor = INSTRUCTORS.find(i => i.id === selectedInstructorId) || INSTRUCTORS[0];

  const handleSendBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 5000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#161F30] border border-[#222F46] rounded-3xl p-6 sm:p-7 shadow-card-glow text-left animate-scale-up"
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CCFF00] via-[#FF5722] to-[#CCFF00]" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#0B0F17]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#222F46]">
          <div className="w-9 h-9 rounded-xl bg-[#CCFF00]/15 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              RiderPass Eğitmen Kokpiti (Simülasyon)
            </h3>
            <p className="text-xs text-slate-400">
              Canlı takvim ve öğrenci seans yönetim paneli
            </p>
          </div>
        </div>

        {/* Switch Instructor Profile Selector */}
        <div className="mb-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Giriş Yapılan Eğitmen Profili
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INSTRUCTORS.slice(0, 4).map((inst) => (
              <button
                key={inst.id}
                onClick={() => setSelectedInstructorId(inst.id)}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                  selectedInstructorId === inst.id
                    ? 'bg-[#0B0F17] border-[#CCFF00] text-white shadow-neon-lime'
                    : 'bg-[#0B0F17]/60 border-[#222F46] text-slate-400 hover:text-slate-200'
                }`}
              >
                <img 
                  src={inst.image} 
                  alt={inst.name} 
                  className="w-7 h-7 rounded-lg object-cover" 
                />
                <span className="text-xs font-bold truncate">{inst.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Instructor Active Profile Card */}
        <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#222F46] mb-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#222F46]">
            <div className="flex items-center gap-3">
              <img 
                src={currentInstructor.image} 
                alt={currentInstructor.name} 
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#FF5722]"
              />
              <div>
                <h4 className="font-bold text-white text-base">
                  {currentInstructor.name}
                </h4>
                <p className="text-xs text-[#FF5722] font-semibold">
                  {currentInstructor.branch} • {currentInstructor.location}
                </p>
              </div>
            </div>

            {/* Toggle Status */}
            <button
              onClick={() => setIsAcceptingBookings(!isAcceptingBookings)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                isAcceptingBookings 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{isAcceptingBookings ? 'Canlı Takvim Açık' : 'Randevular Kapalı'}</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-3 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Bugünkü Seans</span>
              <div className="text-base font-black text-white mt-0.5">3 Seans</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Bugünkü Ciro</span>
              <div className="text-base font-black text-[#CCFF00] mt-0.5">
                {(currentInstructor.price * 3).toLocaleString('tr-TR')} TL
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Puan Ortalaması</span>
              <div className="text-base font-black text-amber-400 mt-0.5">
                ⭐ {currentInstructor.rating}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Weather Action */}
        <div className="p-4 rounded-2xl bg-[#0B0F17]/80 border border-[#FF5722]/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#FF5722] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Hava Muhalefeti Otomasyonu
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Hava şartları spora engel olduğunda tek butonla bugünün öğrencilerine otomatik WhatsApp/SMS iptal &amp; telafi bilgilendirmesi gönderin.
          </p>

          <button
            onClick={handleSendBroadcast}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-[#FF5722] hover:bg-[#FF7043] text-white shadow-neon-orange transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Hava Koşulu Nedeniyle Dersi Ertele (WhatsApp &amp; SMS)</span>
          </button>

          {broadcastSent && (
            <div className="mt-2.5 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium text-center animate-fade-in">
              ✓ Bugünkü tüm öğrencilere WhatsApp/SMS iptal &amp; erteleme bildirimi gönderildi!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
