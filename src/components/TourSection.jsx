import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  User, 
  Check, 
  Award,
  Download
} from 'lucide-react';
import { TOUR_DATES } from '../data/songsData';
import confetti from 'canvas-confetti';

export default function TourSection() {
  const [showVipModal, setShowVipModal] = useState(false);
  const [fanName, setFanName] = useState('Austin');
  const [selectedCity, setSelectedCity] = useState('Nashville, TN');
  const [passGenerated, setPassGenerated] = useState(false);

  const handleGeneratePass = (e) => {
    e.preventDefault();
    setPassGenerated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#8b5cf6', '#06b6d4']
    });
  };

  return (
    <section id="tour" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-pink-300">
              Live Concert Experience
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            wear your heart out tour<span className="text-pink-500">.</span>
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
            Catch Jonathan, Joey, and Nick live on stage. Feel the sub-bass and sing every lyric at the top of your lungs.
          </p>
        </div>

        {/* Generate VIP Pass Button */}
        <button
          onClick={() => setShowVipModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/40 text-pink-200 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.2)]"
        >
          <Award className="w-4 h-4 text-pink-400" />
          <span>Generate VIP Laminate Pass</span>
        </button>
      </div>

      {/* Tour Dates List */}
      <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden divide-y divide-white/5 shadow-2xl">
        {TOUR_DATES.map((tour) => (
          <div
            key={tour.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 transition-colors duration-200 hover:bg-white/5 ${
              tour.isNext ? 'bg-pink-500/10 border-l-4 border-l-pink-500' : ''
            }`}
          >
            {/* Date & Location */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-0">
              
              {/* Date Box */}
              <div className="px-3.5 py-2 rounded-2xl bg-black/60 border border-white/10 text-center shrink-0 min-w-[75px]">
                <span className="block text-xs font-mono font-bold text-pink-400">
                  {tour.date.split(' ')[0]}
                </span>
                <span className="block font-syne text-xl font-extrabold text-white leading-none mt-0.5">
                  {tour.date.split(' ')[1].replace(',', '')}
                </span>
              </div>

              {/* City & Venue */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-syne text-lg sm:text-xl font-bold text-white">
                    {tour.city}
                  </h3>
                  {tour.isNext && (
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-pink-500 text-white rounded-full">
                      NEXT SHOW
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span>{tour.venue}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500 font-mono text-xs">{tour.time}</span>
                </p>
              </div>
            </div>

            {/* Status & Tickets CTA */}
            <div className="flex items-center gap-4 self-end sm:self-center">
              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${
                tour.status === 'Selling Fast' 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                  : tour.status === 'VIP Available'
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                    : 'bg-white/5 border-white/10 text-slate-400'
              }`}>
                {tour.status}
              </span>

              <a
                href={tour.ticketsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(236,72,153,0.3)] flex items-center gap-1.5"
              >
                <Ticket className="w-3.5 h-3.5" />
                Tickets
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive VIP Laminate Generator Modal */}
      {showVipModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <h3 className="font-syne text-xl font-bold text-white">Custom VIP Laminate Pass</h3>
              </div>
              <button 
                onClick={() => setShowVipModal(false)}
                className="text-slate-400 hover:text-white text-lg font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            {!passGenerated ? (
              <form onSubmit={handleGeneratePass} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    value={fanName}
                    onChange={(e) => setFanName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-pink-500 focus:outline-none text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Tour Stop</label>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-pink-500 focus:outline-none text-sm font-medium"
                  >
                    {TOUR_DATES.map(t => (
                      <option key={t.id} value={t.city}>{t.city} - {t.venue}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] cursor-pointer"
                >
                  Generate Holographic Pass ✨
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                {/* Generated Digital Pass */}
                <div className="relative w-64 aspect-[1/1.5] rounded-2xl bg-gradient-to-b from-purple-900 via-slate-900 to-pink-950 p-4 border-2 border-pink-400/60 shadow-2xl flex flex-col justify-between text-center overflow-hidden">
                  
                  {/* Hologram sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>

                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <span className="text-[10px] font-mono font-bold text-pink-300">VIP ACCESS</span>
                    <span className="text-[10px] font-mono text-slate-400">#NIGHTLY-2026</span>
                  </div>

                  <div className="my-auto space-y-1">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">HOLDER</p>
                    <h4 className="font-syne text-2xl font-extrabold text-white tracking-wide">{fanName}</h4>
                    <p className="text-xs font-mono text-pink-300">{selectedCity}</p>
                  </div>

                  <div className="border-t border-white/20 pt-2 text-[9px] font-mono text-slate-300">
                    ALL ACCESS • SOUNDCHECK • NIGHT, LOVE YOU.
                  </div>
                </div>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => setPassGenerated(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold"
                  >
                    Edit Info
                  </button>
                  <button
                    onClick={() => setShowVipModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
