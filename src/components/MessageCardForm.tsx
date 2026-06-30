'use client';

import React from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { Mail, Sparkles, Heart } from 'lucide-react';

export default function MessageCardForm() {
  const { messageCard, updateMessageCard } = useBouquetStore();

  const handleToggle = () => {
    updateMessageCard({ enabled: !messageCard.enabled });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateMessageCard({ [name]: value });
  };

  // Graceful fallbacks for empty states
  const recipientDisplay = messageCard.recipient.trim() || 'Bittu';
  const senderDisplay = messageCard.sender.trim() || 'Navi';
  const messageDisplay = messageCard.message.trim() || 'Your customized romantic note will be generated here by our florist AI upon download... ❤️';

  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-amber-800" />
          <h3 className="font-serif text-lg text-stone-800 font-semibold">Message Card</h3>
        </div>
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            messageCard.enabled ? 'bg-amber-800' : 'bg-stone-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              messageCard.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <p className="text-xs text-stone-500">
        Attach a beautiful digital greeting card to your bouquet. Customize the sender and recipient names below.
      </p>

      {messageCard.enabled && (
        <div className="flex flex-col gap-5 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* Personalize Bouquet Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1" htmlFor="recipient">
                To (Recipient)
              </label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                value={messageCard.recipient}
                onChange={handleChange}
                placeholder="Bittu (Default)"
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white/60 focus:outline-none focus:border-amber-800 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1" htmlFor="sender">
                From (Sender)
              </label>
              <input
                type="text"
                id="sender"
                name="sender"
                value={messageCard.sender}
                onChange={handleChange}
                placeholder="Navi (Default)"
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white/60 focus:outline-none focus:border-amber-800 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1" htmlFor="message">
              Card Preview / Message Template
            </label>
            <textarea
              id="message"
              name="message"
              value={messageCard.message}
              onChange={handleChange}
              rows={3}
              placeholder="Leave blank to let AI generate a fresh heartfelt note..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white/60 focus:outline-none focus:border-amber-800 transition-colors resize-none"
            />
            <p className="text-[10px] text-amber-700/80 font-medium mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Note: Every download automatically generates a unique romantic note unless customized.
            </p>
          </div>

          {/* Real-time Calligraphy Preview Screen */}
          <div className="flex flex-col gap-2 mt-2">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Live Card Preview</h4>
            <div 
              className="relative p-5 rounded-xl border-2 border-dashed border-[#b38254]/40 bg-stone-50/70 shadow-inner flex flex-col items-center justify-between min-h-[220px] text-center"
              style={{
                background: 'radial-gradient(circle at 10% 10%, rgba(245, 242, 235, 0.5) 0%, transparent 85%), #faf9f6'
              }}
            >
              {/* Double border accents */}
              <div className="absolute inset-2 border border-[#b38254]/20 rounded-lg pointer-events-none"></div>

              {/* To Header */}
              <div className="z-10 font-serif text-sm font-semibold text-[#b38254] flex items-center gap-1">
                For {recipientDisplay} <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse inline" />
              </div>

              {/* Card Body */}
              <div className="z-10 px-4 py-2 my-2 font-serif text-sm italic text-stone-700 leading-relaxed max-w-[280px]">
                "{messageDisplay}"
              </div>

              {/* From Footer */}
              <div className="z-10 flex flex-col items-center">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">Forever yours,</span>
                <span className="font-serif text-sm font-semibold text-stone-800 mt-0.5">{senderDisplay}</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
