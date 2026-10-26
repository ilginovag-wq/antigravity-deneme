import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Compass, 
  Radio, 
  CloudSun, 
  Menu, 
  X,
  UserCheck,
  CalendarCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery,
  onOpenInstructorPortal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTabs = [
    { id: 'explore', label: 'Eğitmen Keşfet', icon: Compass },
    { id: 'community', label: 'Topluluk & Etkinlikler', icon: Radio, badge: 'Canlı' },
    { id: 'weather', label: 'Hava / Spot Durumu', icon: CloudSun },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF5500] to-amber-500 p-[2px] shadow-sm group-hover:shadow-md transition-all">
              <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-[#0F172A] flex items-center">
                Rider<span className="text-[#FF5500]">Pass</span>
                <span className="ml-1.5 text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hidden sm:inline-block">
                  PRO
                </span>
              </span>
              <span className="text-[9px] tracking-widest uppercase text-slate-400 font-bold -mt-0.5 hidden sm:block">
                EKSTREM SPOR REZERVASYON PLATFORMU
              </span>
            </div>
          </div>

          {/* Desktop Nav Tabs (Requirement 2.D Topluluk & Etkinlikler) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/70">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF5500]' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[10px] uppercase font-black px-1.5 py-0.2 rounded-full bg-emerald-500 text-white shadow-xs">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Search & 'Hoca Paneli' Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hoca, spot veya branş ara..."
                className="w-52 lg:w-60 pl-10 pr-4 py-2 bg-slate-100/90 border border-slate-200 focus:bg-white focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Requirement 2.B: 'Hoca Paneli' Button */}
            <button
              id="instructor-login-btn"
              onClick={onOpenInstructorPortal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Hoca Paneli</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenInstructorPortal}
              className="p-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1"
              title="Hoca Paneli"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px]">Hoca</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3 animate-fade-in">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hoca, spot veya branş ara..."
                className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold ${
                      isActive 
                        ? 'bg-[#FF5500] text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </span>
                    {tab.badge && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
