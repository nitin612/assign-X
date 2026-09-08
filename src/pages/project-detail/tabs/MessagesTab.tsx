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
    <div
      className="card"
      style={{
        maxWidth: '840px',
        margin: '0 auto',
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '620px'
      }}
    >
      {/* Header with Supervisor Context */}
      <div
        style={{
          padding: '14px var(--space-5)',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-canvas)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={project.supervisor.avatar}
              alt={project.supervisor.name}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '9999px',
                objectFit: 'cover'
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '9px',
                height: '9px',
                borderRadius: '9999px',
                backgroundColor: '#10B981',
                border: '1.5px solid #FFFFFF'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {project.supervisor.name}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                ({project.supervisor.role})
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {project.supervisor.responseTime}
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            backgroundColor: 'var(--bg-surface)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-default)'
          }}
        >
          <Shield size={12} color="#2563EB" />
          <span>Direct Accountable Channel</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div
        style={{
          flex: 1,
          padding: 'var(--space-5)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          backgroundColor: '#FCFDFF'
        }}
      >
        <div style={{ textAlign: 'center', margin: '4px 0 12px' }}>
          <span
            style={{
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              backgroundColor: 'var(--bg-subtle)',
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            Direct communication with your designated Supervisor
          </span>
        </div>

        {projectMessages.map(msg => {
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
                  src={msg.senderAvatar || project.supervisor.avatar}
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
                  maxWidth: '72%',
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

                  {msg.attachments && msg.attachments.length > 0 && (
                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: isClient ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-subtle)' }}>
                      {msg.attachments.map((att, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: '11px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: isClient ? '#EFF6FF' : 'var(--brand-primary)',
                            fontWeight: 500
                          }}
                        >
                          📎 {att.name} ({att.size})
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

      {/* Message Input Form */}
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
            onClick={handleAttachSimulate}
            title="Attach file"
          >
            <Paperclip size={16} />
          </button>

          <input
            type="text"
            className="form-input"
            style={{ padding: '9px 12px', fontSize: '13px' }}
            placeholder={`Reply to ${project.supervisor.name}...`}
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
  );
};
