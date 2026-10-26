import React, { useState } from 'react';
import { INSTRUCTORS } from '../data/mockData';
import { 
  X, 
  Copy, 
  Check, 
  AlertTriangle, 
  Link as LinkIcon, 
  UserCheck, 
  Calendar, 
  MessageSquare,
  Sparkles,
  PhoneCall,
  Clock
} from 'lucide-react';

export default function InstructorPortalModal({ isOpen, onClose }) {
  const [selectedInstructorId, setSelectedInstructorId] = useState(INSTRUCTORS[0].id);
  const [isCopied, setIsCopied] = useState(false);
  const [cancellationAlertSent, setCancellationAlertSent] = useState(false);

  if (!isOpen) return null;

  const currentInstructor = INSTRUCTORS.find(i => i.id === selectedInstructorId) || INSTRUCTORS[0];
  const profileLink = `riderpass.app/${currentInstructor.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://${profileLink}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePostponeSessions = () => {
    setCancellationAlertSent(true);
  };

  const handleResetCancellation = () => {
    setCancellationAlertSent(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden animate-scale-up"
      >
        {/* Top Accent Orange Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF5500] via-amber-400 to-[#10B981]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 text-[#FF5500] flex items-center justify-center font-black">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Hoca Paneli &amp; Seans Yönetimi
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Kişisel rezervasyon linkiniz ve anlık hava erteleme masası
            </p>
          </div>
        </div>

        {/* Instructor Profile Selector */}
        <div className="mb-5">
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
            Aktif Eğitmen Profili Seçin:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INSTRUCTORS.slice(0, 4).map((inst) => (
              <button
                key={inst.id}
                onClick={() => {
                  setSelectedInstructorId(inst.id);
                  setCancellationAlertSent(false);
                }}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                  selectedInstructorId === inst.id
                    ? 'bg-orange-50/80 border-[#FF5500] text-slate-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
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

        {/* Section 1: Kişisel Instagram Biyo Linki (Requirement 2.B) */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-[#FF5500]" /> Eğitmenin Kişisel Linki
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Canlı Profil Aktif
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            Öğrencilerinizin doğrudan sizin canlı takviminize ulaşması için profil linkinizi Instagram bionuzda veya WhatsApp durumunuzda paylaşın:
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-mono font-bold text-slate-800 flex items-center gap-2 shadow-xs truncate select-all">
              <span className="text-slate-400">https://</span>
              <span className="text-[#FF5500]">{profileLink}</span>
            </div>

            {/* Requested 'Linki Kopyala (Instagram Biyo İçin)' Button */}
            <button
              onClick={handleCopyLink}
              id="copy-instructor-bio-link-btn"
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                isCopied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#FF5500] hover:bg-[#FF6B1A] text-white shadow-neon-orange'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Kopyalandı! ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Linki Kopyala (Instagram Biyo İçin)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section 2: Acil Hava İptali Butonu (Requirement 2.B) */}
        <div className="p-4.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#FF5500]" /> Acil Hava Koşulu Yönetimi
            </span>
            <span className="text-xs font-bold text-slate-600">
              Bugün: <strong className="text-slate-900">{currentInstructor.todayStudents?.length || 3} Randevu</strong>
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
            Şiddetli yağış, fırtına veya sıfır rüzgar durumlarında tek tıkla bugünün öğrencilerine otomatik erteleme bildirimi gönderin.
          </p>

          {!cancellationAlertSent ? (
            /* Requested '⚠️ Hava Koşulu Nedeniyle Bugünkü Seansları Ertele' Button */
            <button
              id="emergency-weather-cancel-btn"
              onClick={handlePostponeSessions}
              className="w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-red-600 to-[#FF5500] hover:from-red-700 hover:to-[#FF6B1A] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>⚠️ Hava Koşulu Nedeniyle Bugünkü Seansları Ertele</span>
            </button>
          ) : (
            /* Requested feedback alert simulation */
            <div className="p-4 rounded-xl bg-white border border-emerald-300 text-left animate-fade-in shadow-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-sm mb-1.5">
                <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
                <span>Bildirim Başarıyla Gönderildi!</span>
              </div>
              <p className="text-xs font-bold text-slate-800 leading-relaxed">
                "Bugün randevusu olan {currentInstructor.todayStudents?.length || 3} öğrenciye WhatsApp erteleme bildirimi iletildi."
              </p>
              
              {/* List of affected students simulated */}
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                {currentInstructor.todayStudents?.map((st, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                    <span>{st.name} ({st.time})</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> WhatsApp Gönderildi
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-right">
                <button
                  onClick={handleResetCancellation}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Durumu Sıfırla
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
