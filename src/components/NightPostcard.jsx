import React, { useState, useRef } from 'react';
import { 
  Heart, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  Send,
  MessageCircle,
  Quote
} from 'lucide-react';
import { NIGHT_POSTCARD_QUOTES } from '../data/songsData';
import confetti from 'canvas-confetti';

export default function NightPostcard() {
  const [selectedQuote, setSelectedQuote] = useState(NIGHT_POSTCARD_QUOTES[0]);
  const [customText, setCustomText] = useState('');
  const [recipient, setRecipient] = useState('you');
  const [sender, setSender] = useState('me');
  const [bgStyle, setBgStyle] = useState('violet');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  const bgStyles = [
    { id: 'violet', label: 'Midnight Violet', class: 'from-purple-950 via-slate-900 to-indigo-950 border-purple-500/40 text-purple-200' },
    { id: 'pink', label: 'Neon Heartbreak', class: 'from-pink-950 via-slate-900 to-fuchsia-950 border-pink-500/40 text-pink-200' },
    { id: 'blue', label: 'Highway Cyan', class: 'from-cyan-950 via-slate-900 to-blue-950 border-cyan-500/40 text-cyan-200' },
    { id: 'amber', label: 'Golden Hour Dusk', class: 'from-amber-950 via-purple-950 to-slate-950 border-amber-500/40 text-amber-200' },
  ];

  const displayText = customText.trim() ? customText : selectedQuote;

  const handleCopyCard = () => {
    const text = `To: ${recipient}\n"${displayText}"\nFrom: ${sender}\n— nightly. (night, love you.)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ec4899', '#a855f7']
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="postcards" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-mono">
          <Heart className="w-3.5 h-3.5" />
          Late Night Thoughts
        </div>
        <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          night, love you. postcard creator<span className="text-pink-500">.</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Send a late-night note or your favorite lyric to someone you miss. Designed with signature Nightly typography.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Customizer Form */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Quote className="w-5 h-5 text-pink-400" />
            <h3 className="font-syne text-xl font-bold text-white">Compose Postcard</h3>
          </div>

          {/* Quick Lyric Quote Buttons */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              Select a Nightly Lyric:
            </label>
            <div className="flex flex-wrap gap-2">
              {NIGHT_POSTCARD_QUOTES.map((quote, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQuote(quote);
                    setCustomText('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium text-left transition-all cursor-pointer truncate max-w-full ${
                    selectedQuote === quote && !customText
                      ? 'bg-pink-500 text-white font-semibold shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  "{quote}"
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message input */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Or Write Your Own Night Thought:
            </label>
            <textarea
              rows={3}
              placeholder="e.g. driving home listening to 'the movies' thinking of you..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-pink-500 text-sm"
            ></textarea>
          </div>

          {/* To & From */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">To</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">From</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Color Gradient Picker */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Card Aesthetic:</label>
            <div className="grid grid-cols-2 gap-2">
              {bgStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setBgStyle(style.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    bgStyle === style.id
                      ? 'bg-white/15 border-pink-500 text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${style.class}`}></span>
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCopyCard}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Postcard Copied to Clipboard!' : 'Copy & Share Night Thought'}</span>
          </button>
        </div>

        {/* Right: Live Interactive Visual Postcard */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            ref={cardRef}
            className={`w-full max-w-md aspect-[1.4/1] rounded-3xl bg-gradient-to-br ${
              bgStyles.find(b => b.id === bgStyle)?.class || bgStyles[0].class
            } border-2 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none`}
          >
            {/* Stamp & Timestamp Header */}
            <div className="flex items-start justify-between border-b border-white/15 pb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  POSTCARD FOR:
                </span>
                <span className="font-syne text-lg font-bold text-white tracking-wide">
                  {recipient || 'you'}
                </span>
              </div>

              {/* Glowing Stamp Badge */}
              <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-pink-500/40 text-center shadow-inner">
                <span className="text-[9px] font-mono font-bold text-pink-300 block leading-none">
                  NIGHTLY.
                </span>
                <span className="text-[8px] font-mono text-slate-400 block mt-0.5">
                  NASHVILLE TN
                </span>
              </div>
            </div>

            {/* Central Heartfelt Lyric / Thought */}
            <div className="my-auto py-4">
              <p className="font-syne text-lg sm:text-xl font-extrabold text-white leading-snug tracking-tight">
                "{displayText}"
              </p>
            </div>

            {/* Postcard Footer Stamp */}
            <div className="flex items-end justify-between border-t border-white/15 pt-4">
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">FROM:</span>
                <span className="font-mono text-xs font-semibold text-pink-300">
                  {sender || 'me'}
                </span>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-extrabold text-white block">
                  night, love you<span className="text-pink-500">.</span>
                </span>
                <span className="text-[8px] font-mono text-slate-400">
                  02:00 AM • HEADLIGHTS ON
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
