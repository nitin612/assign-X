import React, { useState } from 'react';
import type { Project } from '../../../types';
import { useApp } from '../../../context/AppContext';
import { Send, Paperclip, Shield, CheckCheck } from 'lucide-react';

interface MessagesTabProps {
  project: Project;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({ project }) => {
  const { messages, sendMessage } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);

  const projectMessages = messages[project.id] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() && !attachment) return;

    sendMessage(
      project.id,
      inputMessage,
      attachment ? [{ name: attachment, size: '1.8 MB', type: 'PDF' }] : undefined
    );
    setInputMessage('');
    setAttachment(null);
  };

  const handleAttachSimulate = () => {
    setAttachment(`Asset_Spec_${Date.now().toString().slice(-4)}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[640px]">
      {/* Header with Supervisor Context */}
      <div className="bg-white/85 dark:bg-[#121216]/85 backdrop-blur-md border border-stone-200/80 dark:border-zinc-800/80 rounded-2xl px-5 py-3.5 shadow-xs mb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={project.supervisor.avatar}
              alt={project.supervisor.name}
              className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-zinc-700"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {project.supervisor.name}
              </span>
              <span className="text-[10.5px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded-full">
                Lead
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-zinc-400">
              {project.supervisor.responseTime}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/70 dark:border-zinc-700/60 px-3 py-1.5 rounded-full">
          <Shield size={13} className="text-blue-600 dark:text-blue-400" />
          <span>Direct Accountable Channel</span>
        </div>
      </div>

      {/* Messages Thread — Blended with canvas */}
      <div className="flex-1 overflow-y-auto px-2 py-3 flex flex-col gap-4">
        <div className="text-center my-1">
          <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500 bg-stone-100/80 dark:bg-zinc-800/60 px-3 py-1 rounded-full">
            Direct communication with your designated Supervisor
          </span>
        </div>

        {projectMessages.map(msg => {
          const isClient = msg.sender === 'client';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isClient ? 'justify-end' : 'justify-start'}`}
            >
              {!isClient && (
                <img
                  src={msg.senderAvatar || project.supervisor.avatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-stone-200 dark:border-zinc-700 shadow-xs"
                />
              )}

              <div className={`flex flex-col ${isClient ? 'items-end' : 'items-start'} max-w-[78%]`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
                    isClient
                      ? 'bg-[#0052CC] text-white rounded-tr-xs'
                      : 'bg-white dark:bg-[#121216] text-slate-800 dark:text-slate-100 border border-stone-200/80 dark:border-zinc-800/80 rounded-tl-xs'
                  }`}
                >
                  {msg.content}

                  {msg.attachments && msg.attachments.length > 0 && (
                    <div
                      className={`mt-2.5 pt-2 border-t text-xs font-medium flex flex-col gap-1 ${
                        isClient
                          ? 'border-white/20 text-blue-100'
                          : 'border-stone-100 dark:border-zinc-800 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {msg.attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span>📎</span>
                          <span className="underline">{att.name}</span>
                          <span className="opacity-75 text-[11px]">({att.size})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-zinc-500 mt-1 px-1">
                  <span>{msg.timestamp}</span>
                  {isClient && <CheckCheck size={13} className="text-blue-500" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={handleSend}
        className="mt-3 bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-zinc-800/90 rounded-2xl p-2 shadow-xs focus-within:border-[#0052CC] focus-within:shadow-md transition-all shrink-0"
      >
        {attachment && (
          <div className="flex items-center justify-between px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-xl text-xs text-blue-700 dark:text-blue-300 mb-2">
            <span className="flex items-center gap-1.5 truncate">
              📎 {attachment}
            </span>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 ml-2 font-bold cursor-pointer"
              onClick={() => setAttachment(null)}
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 px-1">
          <button
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            onClick={handleAttachSimulate}
            title="Attach file"
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 px-2 py-1.5"
            placeholder={`Reply to ${project.supervisor.name}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />

          <button
            type="submit"
            className="p-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-xs"
            disabled={!inputMessage.trim() && !attachment}
          >
            <Send size={15} />
          </button>
        </div>
      </form>
    </div>
  );
};
