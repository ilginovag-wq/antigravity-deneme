import React from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Clock,
  Waves
} from 'lucide-react';

export default function InstructorCard({ instructor, onBook }) {
  const isWaterSport = instructor.category === 'Kitesurf';

  return (
    <div 
      className="group relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image & Header */}
      <div className="relative">
        {/* Cover Action Photo with dark gradient overlay: gradient-to-t from-black/80 to-transparent */}
        <div className="h-52 w-full overflow-hidden relative bg-slate-100">
          <img 
            src={instructor.coverImage} 
            alt={instructor.spotName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          {/* Subtle gradient overlay to provide contrast for badges and avatar */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          
          {/* Live Status LED Badge (Mint Green #10B981) */}
          <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md border border-emerald-200 text-slate-900 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-2 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-tight font-black text-slate-800">{instructor.liveStatus}</span>
          </div>

          {/* Earliest Slot Pill (Top-Right) */}
          <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{instructor.earliestSlot}</span>
          </div>
        </div>

        {/* Profile Avatar Overlap */}
        <div className="px-6 -mt-11 flex items-end justify-between relative z-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-white shadow-md bg-white">
              <img 
                src={instructor.image} 
                alt={instructor.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div 
              className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-xs border-2 border-white" 
              title="Doğrulanmış Pro Eğitmen"
            >
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-black text-slate-900">{instructor.rating}</span>
            <span className="text-xs text-slate-500 font-semibold">({instructor.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Name & Branch */}
          <div className="mt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-[#0F172A] group-hover:text-[#FF5500] transition-colors">
                {instructor.name}
              </h3>
              {isWaterSport && (
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center gap-1">
                  <Waves className="w-3 h-3" /> SU SPORU
                </span>
              )}
            </div>
            
            <p className="text-sm font-bold text-[#FF5500] mt-0.5">
              {instructor.branch}
            </p>
          </div>

          {/* Location / Spot */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{instructor.spotName}</span>
          </div>

          {/* Bio in Anthracite (#475569) */}
          <p className="mt-3 text-xs text-[#475569] leading-relaxed line-clamp-2">
            {instructor.bio}
          </p>

          {/* Badges list */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {instructor.badges.map((badge, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#FF5500]" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Price & Glowing Orange Book Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">SEANS ÜCRETİ</div>
            <div className="text-xl font-black text-slate-900 flex items-baseline gap-1">
              {instructor.price.toLocaleString('tr-TR')} <span className="text-xs font-semibold text-slate-500">TL / Saat</span>
            </div>
          </div>

          {/* Requested glowing neon orange button */}
          <button
            id={`book-btn-${instructor.id}`}
            onClick={() => onBook(instructor)}
            className="px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-[#FF5500] hover:bg-[#FF6B1A] active:scale-95 text-white shadow-[0_0_20px_rgba(255,85,0,0.35)] hover:shadow-[0_0_30px_rgba(255,85,0,0.6)] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Randevu Al</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
