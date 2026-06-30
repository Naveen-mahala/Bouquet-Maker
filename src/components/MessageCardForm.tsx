'use client';

import React from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function MessageCardForm() {
  const { messageCard, updateMessageCard } = useBouquetStore();

  const handleToggle = () => {
    updateMessageCard({ enabled: !messageCard.enabled });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateMessageCard({ [name]: value });
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md shadow-lg">
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
        Attach a beautiful digital greeting card. It will be styled elegantly and exported alongside your floral arrangement.
      </p>

      {messageCard.enabled && (
        <div className="flex flex-col gap-3.5 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1" htmlFor="recipient">
              Recipient Name
            </label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={messageCard.recipient}
              onChange={handleChange}
              placeholder="e.g., Sarah Jenkins"
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white/60 focus:outline-none focus:border-amber-800 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1" htmlFor="title">
              Greeting Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={messageCard.title}
              onChange={handleChange}
              placeholder="e.g., For My Favorite Human ❤️"
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white/60 focus:outline-none focus:border-amber-800 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1" htmlFor="message">
              Personal Message
            </label>
            <textarea
              id="message"
              name="message"
              value={messageCard.message}
              onChange={handleChange}
              rows={4}
              placeholder="Write your heartfelt note here..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white/60 focus:outline-none focus:border-amber-800 transition-colors resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
