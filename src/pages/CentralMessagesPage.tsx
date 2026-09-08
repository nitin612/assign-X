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
    <div>
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Messages
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Direct communication channels with your designated project supervisors.
        </p>
      </div>

      {/* Two-Panel Layout */}
      <div
        className="card"
        style={{
          padding: 0,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          height: '660px'
        }}
      >
        {/* Left Panel: Conversation List */}
        <div
          style={{
            borderRight: '1px solid var(--border-default)',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              padding: '14px var(--space-4)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Assigned Supervisors ({projects.length})
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {projects.map(p => {
              const isSelected = p.id === selectedProjectId;
              const thread = messages[p.id] || [];
              const lastMessage = thread[thread.length - 1];

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  style={{
                    padding: '12px var(--space-4)',
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: isSelected ? 'var(--brand-subtle)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={p.supervisor.avatar}
                        alt={p.supervisor.name}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '9999px',
                          objectFit: 'cover'
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '8px',
                          height: '8px',
                          borderRadius: '9999px',
                          backgroundColor: '#10B981',
                          border: '1.5px solid #FFFFFF'
                        }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                        <h4
                          style={{
                            fontSize: '13px',
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected ? 'var(--brand-primary)' : 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {p.supervisor.name}
                        </h4>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                          {lastMessage?.timestamp.split(',')[0] || 'Recently'}
                        </span>
                      </div>

                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px', fontWeight: 500 }}>
                        {p.title}
                      </div>

                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.3
                        }}
                      >
                        {lastMessage ? lastMessage.content : 'New assignment created'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Selected Conversation */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FCFDFF' }}>
          {/* Header */}
          <div
            style={{
              padding: '14px var(--space-5)',
              borderBottom: '1px solid var(--border-default)',
              backgroundColor: 'var(--bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={selectedProject.supervisor.avatar}
                alt={selectedProject.supervisor.name}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9999px',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {selectedProject.supervisor.name}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--brand-primary)', backgroundColor: 'var(--brand-subtle)', padding: '1px 6px', borderRadius: '4px' }}>
                    Supervisor
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Project: {selectedProject.title}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <Shield size={14} color="#2563EB" />
              <span>{selectedProject.supervisor.responseTime}</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              flex: 1,
              padding: 'var(--space-5)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}
          >
            {activeMessages.map(msg => {
              const isClient = msg.sender === 'client';

              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: isClient ? 'flex-end' : 'flex-start',
                    gap: '10px'
                  }}
                >
                  {!isClient && (
                    <img
                      src={selectedProject.supervisor.avatar}
                      alt={msg.senderName}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '9999px',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                    />
                  )}

                  <div
                    style={{
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isClient ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: isClient
                          ? '12px 12px 2px 12px'
                          : '12px 12px 12px 2px',
                        backgroundColor: isClient ? 'var(--brand-primary)' : 'var(--bg-surface)',
                        color: isClient ? '#FFFFFF' : 'var(--text-primary)',
                        border: isClient ? 'none' : '1px solid var(--border-default)',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        boxShadow: 'var(--shadow-subtle)'
                      }}
                    >
                      {msg.content}

                      {msg.attachments && (
                        <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: isClient ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-subtle)' }}>
                          {msg.attachments.map((att, i) => (
                            <div key={i} style={{ fontSize: '11px', fontWeight: 500 }}>
                              📎 {att.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        color: 'var(--text-tertiary)',
                        marginTop: '3px'
                      }}
                    >
                      <span>{msg.timestamp}</span>
                      {isClient && <CheckCheck size={13} color="#2563EB" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSend}
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderTop: '1px solid var(--border-default)',
              backgroundColor: 'var(--bg-surface)'
            }}
          >
            {attachment && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 8px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '11px',
                  marginBottom: '6px'
                }}
              >
                <span>📎 {attachment}</span>
                <button
                  type="button"
                  style={{ color: 'var(--text-tertiary)', cursor: 'pointer' }}
                  onClick={() => setAttachment(null)}
                >
                  ✕
                </button>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className="topbar-icon-btn"
                style={{ width: '34px', height: '34px' }}
                onClick={() => setAttachment(`Brief_Update_${Date.now().toString().slice(-4)}.pdf`)}
                title="Attach file"
              >
                <Paperclip size={16} />
              </button>

              <input
                type="text"
                className="form-input"
                style={{ padding: '9px 12px', fontSize: '13px' }}
                placeholder={`Message ${selectedProject.supervisor.name}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '9px 14px' }}
                disabled={!inputMessage.trim() && !attachment}
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
