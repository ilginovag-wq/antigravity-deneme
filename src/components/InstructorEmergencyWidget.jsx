import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  X, 
  MessageSquare, 
  CloudRain
} from 'lucide-react';

export default function InstructorEmergencyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const [affectedCount, setAffectedCount] = useState(4);

  const handlePostponeClasses = () => {
    setNotificationSent(true);
  };

  const handleReset = () => {
    setNotificationSent(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Corner Floating Emergency Button */}
      <aside 
        aria-label="Eğitmen Acil Durum Paneli"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
      >
        <button
          id="instructor-emergency-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="group px-4 py-3 bg-[#0D1117]/90 hover:bg-[#141A24] backdrop-blur-xl border border-[#FF5500] hover:border-[#FF7722] rounded-2xl shadow-[0_0_25px_rgba(255,85,0,0.4)] text-white text-xs font-black flex items-center gap-2.5 transition-all duration-200 cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5500]"></span>
          </span>
          <AlertTriangle className="w-4 h-4 text-[#FF5500]" />
          <span className="hidden sm:inline text-zinc-300">Eğitmen Paneli:</span>
          <span className="text-[#FF5500] font-black underline decoration-dotted">Hava Koşulu Nedeniyle Dersi Ertele</span>
        </button>

        {/* Small Popup Dialog when clicked */}
        {isOpen && (
          <div className="mt-3 w-80 sm:w-96 bg-[#0D1117]/95 backdrop-blur-2xl border border-[#FF5500]/60 rounded-3xl p-6 shadow-glass text-left animate-scale-up">
            <div className="flex items-start justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-[#FF5500]" />
                <h4 className="font-black text-white text-sm">
                  Acil Hava Muhalefeti Masası
                </h4>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!notificationSent ? (
              <div className="pt-3">
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  Yağmur, fırtına veya sıfır rüzgar gibi olağanüstü hava koşullarında tek tıkla seansları askıya alın.
                </p>

                <div className="my-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>Etkilenen Bugünkü Seanslar:</span>
                    <span className="font-black text-white">{affectedCount} Öğrenci</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Otomasyon Kanalı:</span>
                    <span className="text-[#D4FF00] font-bold">WhatsApp + SMS Şablonu</span>
                  </div>
                </div>

                <button
                  id="confirm-emergency-postpone-btn"
                  onClick={handlePostponeClasses}
                  className="w-full py-3 px-4 bg-[#FF5500] hover:bg-[#FF6B1A] text-white font-black text-xs rounded-xl shadow-neon-orange transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Hava Koşulu Nedeniyle Dersi Ertele</span>
                </button>
              </div>
            ) : (
              /* Success notification requested by the user */
              <div className="pt-3 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-2xl bg-[#D4FF00]/15 text-[#D4FF00] flex items-center justify-center mx-auto mb-3 border border-[#D4FF00]/40 shadow-[0_0_15px_rgba(212,255,0,0.3)]">
                  <CheckCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
                
                <h5 className="font-black text-white text-base">
                  Bildirimler Gönderildi!
                </h5>

                <div className="mt-3 p-3.5 rounded-2xl bg-white/[0.04] border border-[#D4FF00]/30 text-left">
                  <p className="text-xs font-bold text-zinc-100 leading-relaxed flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                    <span>Bugünkü tüm öğrencilere WhatsApp/SMS iptal &amp; erteleme bildirimi gönderildi!</span>
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-2 pl-6">
                    Öğrencilere seans telafi takvimi seçim bağlantısı iletildi.
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-300 text-xs font-black border border-white/10 cursor-pointer"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
