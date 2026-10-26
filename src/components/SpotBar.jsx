import React from 'react';
import { SPOT_BAR_ITEMS } from '../data/mockData';
import { Radio, ArrowRight } from 'lucide-react';

export default function SpotBar({ onSpotClick }) {
  return (
    <div className="w-full bg-slate-50/90 border-y border-slate-200/80 backdrop-blur-md py-3 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
        
        {/* Spot Bar Prefix Label */}
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            CANLI SPOT RADARI:
          </span>
        </div>

        {/* Spot Status Ticker Items */}
        <div className="flex items-center gap-4 sm:gap-8 shrink-0">
          {SPOT_BAR_ITEMS.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSpotClick && onSpotClick(item.spot)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer transition-colors group"
            >
              <span className="text-base">{item.emoji}</span>
              <span className="font-bold text-slate-900 group-hover:text-[#FF5500] transition-colors">
                {item.spot}:
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200/70 shadow-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${item.statusDot}`} />
                <span>{item.statusText}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Action Link to Weather Tab */}
        <div className="hidden lg:flex items-center shrink-0 pl-3 border-l border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 hover:text-[#FF5500] cursor-pointer flex items-center gap-1 transition-colors">
            Tüm Telemetriyi Gör
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

      </div>
    </div>
  );
}
