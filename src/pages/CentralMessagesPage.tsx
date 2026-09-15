import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { Send, Paperclip, CheckCheck, Shield } from 'lucide-react';

export const CentralMessagesPage: React.FC = () => {
  const { projects, messages, sendMessage } = useApp();
  const { currentRoute, navigate } = useNavigation();

  const queryProjectId = currentRoute.query.project;
  const selectedProjectId = queryProjectId || projects[0]?.id || 'proj-1';
  const setSelectedProjectId = (id: string) => {
    navigate(`/messages?project=${id}`);
  };

  const [inputMessage, setInputMessage] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const activeMessages = messages[selectedProjectId] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() && !attachment) return;

    sendMessage(
      selectedProjectId,
      inputMessage,
      attachment ? [{ name: attachment, size: '2.1 MB', type: 'PDF' }] : undefined
    );
    setInputMessage('');
    setAttachment(null);
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 overflow-hidden">
      {/* Compact Page Header */}
      <div className="mb-2 shrink-0">
        <div className="h-[36px] flex items-center">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none">
            Messages
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
          Direct communication channels with your designated project supervisors.
        </p>
      </div>

      {/* Two-Column Seamless Layout Pinned to Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-4 flex-1 min-h-0 overflow-hidden">
        {/* Left Panel: Supervisor Conversation List */}
        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm border border-stone-200/60 dark:border-zinc-800/60 rounded-2xl p-2.5 flex flex-col h-full shadow-xs">
          <div className="px-3 py-2.5 text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-between">
            <span>Assigned Supervisors</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-200/60 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-[10px]">
              {projects.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 mt-1">
            {projects.map(p => {
              const isSelected = p.id === selectedProjectId;
              const thread = messages[p.id] || [];
              const lastMessage = thread[thread.length - 1];

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-zinc-800/90 shadow-xs border border-stone-200/90 dark:border-zinc-700'
                      : 'hover:bg-white/60 dark:hover:bg-zinc-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={p.supervisor.avatar}
                        alt={p.supervisor.name}
                        className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-zinc-700"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className={`text-xs truncate ${isSelected ? 'font-bold text-[#0052CC] dark:text-blue-400' : 'font-semibold text-slate-900 dark:text-white'}`}>
                          {p.supervisor.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 dark:text-zinc-500 shrink-0 ml-1 font-medium">
                          {lastMessage?.timestamp.split(',')[0] || 'Recently'}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate mb-0.5 font-medium">
                        {p.title}
                      </div>

                      <p className="text-[11.5px] text-slate-400 dark:text-zinc-500 truncate leading-tight">
                        {lastMessage ? lastMessage.content : 'New assignment created'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Blended Chat Feed */}
        <div className="flex flex-col h-full min-w-0">
          {/* Header Bar */}
          <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-stone-200/70 dark:border-zinc-800/70 rounded-2xl px-5 py-3 shadow-xs mb-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={selectedProject.supervisor.avatar}
                  alt={selectedProject.supervisor.name}
                  className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-zinc-700"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedProject.supervisor.name}
                  </span>
                  <span className="text-[10.5px] font-bold text-[#0052CC] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-900 px-2 py-0.5 rounded-full">
                    Supervisor
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400 truncate max-w-md">
                  Project: <strong className="text-slate-700 dark:text-zinc-300 font-semibold">{selectedProject.title}</strong>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 bg-stone-100/70 dark:bg-zinc-800/60 border border-stone-200/60 dark:border-zinc-700/60 px-3 py-1.5 rounded-full">
              <Shield size={13} className="text-[#0052CC] dark:text-blue-400" />
              <span>{selectedProject.supervisor.responseTime}</span>
            </div>
          </div>

          {/* Messages Feed — Blended directly with the canvas */}
          <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-3.5">
            {activeMessages.map(msg => {
              const isClient = msg.sender === 'client';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isClient ? 'justify-end' : 'justify-start'}`}
                >
                  {!isClient && (
                    <img
                      src={selectedProject.supervisor.avatar}
                      alt={msg.senderName}
                      className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-stone-200 dark:border-zinc-700 shadow-xs"
                    />
                  )}

                  <div className={`flex flex-col ${isClient ? 'items-end' : 'items-start'} max-w-[78%]`}>
                    <div
                      className={`p-3.5 rounded-2xl text-[13.5px] leading-relaxed shadow-xs ${
                        isClient
                          ? 'bg-[#0052CC] text-white rounded-tr-xs'
                          : 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-slate-100 border border-stone-200/80 dark:border-zinc-800 rounded-tl-xs'
                      }`}
                    >
                      {msg.content}

                      {msg.attachments && msg.attachments.length > 0 && (
                        <div
                          className={`mt-2.5 pt-2 border-t text-xs font-medium flex flex-col gap-1 ${
                            isClient
                              ? 'border-white/20 text-blue-100'
                              : 'border-stone-100 dark:border-zinc-800 text-[#0052CC] dark:text-blue-400'
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

          {/* Floating Message Input Bar */}
          <form
            onSubmit={handleSend}
            className="mt-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-stone-200/90 dark:border-zinc-800/90 rounded-2xl p-2 shadow-xs focus-within:border-[#0052CC] focus-within:shadow-md transition-all shrink-0"
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
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                onClick={() => setAttachment(`Update_Spec_${Date.now().toString().slice(-4)}.pdf`)}
                title="Attach file"
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 px-2 py-1.5"
                placeholder={`Message ${selectedProject.supervisor.name}...`}
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
      </div>
    </div>
  );
};
