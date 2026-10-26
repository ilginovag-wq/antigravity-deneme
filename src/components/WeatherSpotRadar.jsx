import React from 'react';
import { SPOT_WEATHER_DATA } from '../data/mockData';
import { 
  Wind, 
  Thermometer, 
  MapPin, 
  ArrowRight,
  Gauge,
  Activity
} from 'lucide-react';

export default function WeatherSpotRadar({ onSelectSpotForFilter }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-black uppercase tracking-wider mb-3">
          <Gauge className="w-4 h-4 text-cyan-600" />
          <span>CANLI TELEMETRİ &amp; PİST RADARI</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Anlık Spot Koşulları &amp; Seans Uygunluğu
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3">
          Hava muhalefetine takılmayın. Rüzgar anemometreleri, kar kalınlıkları ve pist zemin durumları canlı güncellenir.
        </p>
      </div>

      {/* Spot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SPOT_WEATHER_DATA.map((spot) => {
          return (
            <div 
              key={spot.id}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Spot Image Header */}
              <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                <img 
                  src={spot.image} 
                  alt={spot.name} 
                  className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Status Pill */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-slate-900 border border-slate-200 flex items-center gap-2 shadow-xs">
                  <span className={`w-2 h-2 rounded-full ${spot.statusDot}`} />
                  <span>{spot.status}</span>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 text-xs font-bold px-3 py-1 rounded-xl text-white backdrop-blur-md">
                  {spot.category}
                </div>

                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-2xl font-black text-white flex items-center gap-2 drop-shadow-md">
                    <MapPin className="w-5 h-5 text-[#FF5500]" />
                    {spot.name}
                  </h3>
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  
                  {/* Metric 1 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-cyan-600" /> RÜZGAR
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
                      {spot.wind}
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-[#FF5500]" /> SICAKLIK
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
                      {spot.temp}
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" /> DURUM
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-900 mt-1 truncate">
                      {spot.crowd}
                    </div>
                  </div>

                </div>

                {/* Live Radar Note */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-center gap-2.5 mb-5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span><strong>Radar Notu:</strong> {spot.highlight}</span>
                </div>

                {/* Spot Action Button */}
                <button
                  onClick={() => onSelectSpotForFilter(spot.bestBranch)}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Bu Spottaki {spot.bestBranch} Eğitmenlerini Gör</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
