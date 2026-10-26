import React from 'react';
import { 
  BRANCH_FILTERS, 
  LOCATION_FILTERS 
} from '../data/mockData';
import { MapPin, SlidersHorizontal, CheckCircle, Flame } from 'lucide-react';

export default function Hero({ 
  selectedBranch, 
  setSelectedBranch, 
  selectedLocation, 
  setSelectedLocation,
  totalResults
}) {
  return (
    <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="text-center max-w-4xl mx-auto">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-black text-slate-800 mb-6 shadow-xs">
          <Flame className="w-4 h-4 text-[#FF5500]" />
          <span>CANLI SPOT &amp; EĞİTMEN REZERVASYON AĞI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>

        {/* Clean Studio Headline */}
        <h1 
          id="hero-main-title" 
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0F172A] leading-[1.08] mb-6"
        >
          Hocanı Keşfet.{' '}
          <span className="text-[#FF5500]">
            Spotu Seç.
          </span>{' '}
          <span className="text-slate-900">
            Seansını Anında Ayarla.
          </span>
        </h1>

        {/* Subtitle in Anthracite (#475569) */}
        <p className="text-[#475569] text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto mb-9">
          Mesaj trafiği ve belirsizlik yok; eğitmenlerin canlı takviminden boş saatini seçip 30 saniyede dersini ayırt.
        </p>

        {/* Feature Badges in Light Mode */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600 mb-10">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Onaylı &amp; Lisanslı Eğitmenler</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs">
            <CheckCircle className="w-4 h-4 text-[#FF5500]" />
            <span>Ücretsiz İptal &amp; Hava Garantisi</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span>Ekipman Temini Dahil</span>
          </div>
        </div>
      </div>

      {/* Filter Bar Controls Card (Studio Light) */}
      <div className="bg-slate-50/90 border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm">
        
        {/* 1. Branch Filters */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#FF5500]" /> BRANŞ SEÇİMİ
            </span>
            <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
              {totalResults} eğitmen listeleniyor
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {BRANCH_FILTERS.map((branch) => {
              const isSelected = selectedBranch === branch.id;
              return (
                <button
                  key={branch.id}
                  id={`filter-branch-${branch.id}`}
                  onClick={() => setSelectedBranch(branch.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF5500] text-white shadow-neon-orange scale-[1.02]'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <span className="text-base">{branch.icon}</span>
                  <span>{branch.label.replace(/[🛹🪁🏂🚲🚵]/g, '').trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Location Filters */}
        <div className="pt-4 border-t border-slate-200/80">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-emerald-600" /> LOKASYON &amp; SPOT SEÇİMİ
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {LOCATION_FILTERS.map((loc) => {
              const isSelected = selectedLocation === loc;
              return (
                <button
                  key={loc}
                  id={`filter-loc-${loc.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-xs'
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span>{loc}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
