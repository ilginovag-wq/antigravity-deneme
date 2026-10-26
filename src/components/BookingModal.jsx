import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Package, 
  MessageSquare,
  AlertCircle,
  Loader2,
  Gauge,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export default function BookingModal({ instructor, onClose, onBookingSuccess }) {
  const [selectedDay, setSelectedDay] = useState('Bugün');
  const [selectedTime, setSelectedTime] = useState('16:30-17:30');
  const [skillLevel, setSkillLevel] = useState('İlk Kez Başlıyorum'); // 'İlk Kez Başlıyorum' | 'Temel Dönüşler/Drop-in' | 'İleri Seviye'
  const [equipmentChoice, setEquipmentChoice] = useState('included'); // 'own' | 'included'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Loading & confirmation states
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!instructor) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Lütfen ad ve soyadınızı girin.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Lütfen geçerli bir telefon numarası girin (Örn: 05xx xxx xxxx).');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    // Simulate short loading before confirmation
    setTimeout(() => {
      setIsLoading(false);
      const randomCode = 'RP-' + Math.floor(1000 + Math.random() * 9000);
      setBookingCode(randomCode);
      setIsConfirmed(true);

      if (onBookingSuccess) {
        onBookingSuccess({
          code: randomCode,
          instructorName: instructor.name,
          branch: instructor.branch,
          day: selectedDay,
          time: selectedTime,
          skillLevel,
          studentName: fullName,
          phone,
          equipmentChoice,
          price: instructor.price,
        });
      }
    }, 1000);
  };

  return (
    <div 
      id="booking-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div 
        id="booking-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden animate-scale-up my-8"
      >
        {/* Top Accent Orange Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF5500] via-amber-400 to-[#10B981]" />

        {/* Close Button */}
        <button
          id="close-booking-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div>
            {/* Header with Instructor Info */}
            <div className="flex items-start gap-4 pb-5 border-b border-slate-100 pr-8">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-200 shrink-0 bg-slate-100 shadow-xs">
                <img 
                  src={instructor.image} 
                  alt={instructor.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5500] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60 inline-block">
                  CANLI SEANS REZERVASYONU
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">
                  {instructor.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="font-bold text-slate-700">{instructor.branch}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {instructor.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Banner */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block">Ders Ücreti (Birebir Seans)</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Sahada hoca ile seans öncesi nakit/havale</span>
              </div>
              <span className="text-xl font-black text-slate-900">
                {instructor.price.toLocaleString('tr-TR')} TL <span className="text-xs text-slate-500 font-normal">/ Saat</span>
              </span>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleConfirm} className="mt-5 space-y-4 sm:space-y-5">
              
              {/* Requirement 2.C: Seviye Seçimi */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#FF5500]" /> DENEYİM SEVİYENİZİ SEÇİN
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'İlk Kez Başlıyorum',
                    'Temel Dönüşler/Drop-in',
                    'İleri Seviye'
                  ].map((level) => {
                    const isSelected = skillLevel === level;
                    return (
                      <button
                        type="button"
                        key={level}
                        onClick={() => setSkillLevel(level)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-xs scale-[1.02]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gün Seçimi */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" /> SEANS GÜNÜ
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Bugün', 'Yarın', 'Hafta Sonu'].map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        selectedDay === day
                          ? 'bg-[#FF5500] text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Saat Dilimi Seçimi */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> MÜSAİT SEANS SAATİ
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00-11:00', '14:00-15:00', '16:30-17:30'].map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-500 shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Requirement 2.C: Ekipman Durumu */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-slate-600" /> EKİPMAN DURUMU
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  <label 
                    onClick={() => setEquipmentChoice('own')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      equipmentChoice === 'own'
                        ? 'bg-orange-50 border-[#FF5500] text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="equipment" 
                      checked={equipmentChoice === 'own'} 
                      onChange={() => setEquipmentChoice('own')}
                      className="accent-[#FF5500] w-4 h-4 cursor-pointer"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">Kendi ekipmanım var</div>
                      <div className="text-[11px] text-slate-500">Board/bisiklet/koruma hazır</div>
                    </div>
                  </label>

                  <label 
                    onClick={() => setEquipmentChoice('included')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      equipmentChoice === 'included'
                        ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="equipment" 
                      checked={equipmentChoice === 'included'} 
                      onChange={() => setEquipmentChoice('included')}
                      className="accent-emerald-600 w-4 h-4 cursor-pointer"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">Eğitmenden kiralansın</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">+Ücretsiz / Seansa Dahil ✓</div>
                    </div>
                  </label>

                </div>
              </div>

              {/* Öğrenci Bilgileri */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> AD SOYAD
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Örn: Deniz Kaya"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> TELEFON NUMARASI
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xx xxx xxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>

              {/* Requirement 2.C: Ödeme Şeffaflık Notu */}
              <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <CreditCard className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-800">
                  Ödeme Şeffaflık Notu: "Ders ücreti sahada nakit veya havale ile hocaya iletilir (0 TL komisyon)."
                </span>
              </div>

              {/* Onay Butonu */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  id="confirm-booking-btn"
                  className="w-full py-3.5 px-6 rounded-xl font-black text-sm sm:text-base bg-[#FF5500] hover:bg-[#FF6B1A] active:scale-[0.98] text-white shadow-neon-orange hover:shadow-neon-orange-hover transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Seans Takvimi Kilitleniyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Seansı Onayla ({instructor.price.toLocaleString('tr-TR')} TL)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="py-8 text-center animate-fade-in relative">
            <div className="confetti-piece bg-[#FF5500] left-10 top-0" />
            <div className="confetti-piece bg-emerald-500 left-28 -top-4" />
            <div className="confetti-piece bg-amber-400 right-20 -top-2" />
            <div className="confetti-piece bg-[#FF5500] right-10 top-4" />

            <div className="w-18 h-18 rounded-3xl bg-emerald-50 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
              REZERVASYON KODU: {bookingCode}
            </span>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Ders Randevusu Başarıyla Ayrıldı!
            </h3>
            
            <p className="text-sm text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
              Tebrikler <strong className="text-slate-900">{fullName}</strong>! 
              <strong className="text-[#FF5500]"> {instructor.name}</strong> ile seansınız onaylandı.
            </p>

            {/* Summary Details Box */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between items-center text-slate-500">
                <span>Eğitmen:</span>
                <span className="font-bold text-slate-900">{instructor.name}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Seviye &amp; Branş:</span>
                <span className="font-bold text-slate-800">{skillLevel} • {instructor.branch}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Seans Zamanı:</span>
                <span className="font-bold text-[#FF5500]">{selectedDay} • {selectedTime}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Ekipman:</span>
                <span className="font-bold text-slate-800">
                  {equipmentChoice === 'included' ? 'Eğitmen Tarafından Sağlanacak (Dahil)' : 'Öğrenci Kendi Getirecek'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-500 pt-2 border-t border-slate-200">
                <span>İletişim:</span>
                <span className="font-mono text-slate-900 font-bold">{phone}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Eğitmenimiz seans konumu ve koordinasyon için WhatsApp’tan 15 dk içinde ulaşacaktır.</span>
            </div>

            <div className="mt-6">
              <button
                id="booking-finish-btn"
                onClick={onClose}
                className="w-full sm:w-auto px-10 py-3 rounded-xl font-black text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer"
              >
                Tamamla
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
