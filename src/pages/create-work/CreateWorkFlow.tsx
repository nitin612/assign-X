/* Modern Create Work Flow - Inspired by Fiverr Custom Request & Upwork Job Wizard */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigation } from '../../context/NavigationContext';
import type { WorkCategory, NewWorkRequest } from '../../types';
import {
  Globe,
  Smartphone,
  Layout,
  Palette,
  Megaphone,
  PenTool,
  Cpu,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Check,
  Plus
} from 'lucide-react';

export const CreateWorkFlow: React.FC = () => {
  const { createWorkRequest } = useApp();
  const { navigate } = useNavigation();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;

  // Form State
  const [formData, setFormData] = useState<NewWorkRequest>({
    outcomeDescription: '',
    category: 'Website Development',
    title: '',
    detailedDescription: '',
    requiredFeatures: [''],
    referenceLinks: [''],
    attachments: [],
    preferredTech: '',
    additionalNotes: '',
    budgetType: 'range',
    budgetMin: 50000,
    budgetMax: 90000,
    budgetFixed: 75000,
    currency: 'INR (₹)',
    timelineType: 'deadline',
    deadlineDate: '2026-10-30'
  });

  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Categories setup with colorful theme colors
  const categories: {
    category: WorkCategory;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    color: string;
    bgColor: string;
    description: string;
  }[] = [
    {
      category: 'Website Development',
      icon: Globe,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      description: 'Web applications, responsive company sites, e-commerce, and high-converting portals.'
    },
    {
      category: 'Mobile App Development',
      icon: Smartphone,
      color: '#7C3AED',
      bgColor: '#F5F3FF',
      description: 'Native iOS & Android apps, React Native systems, and App Store releases.'
    },
    {
      category: 'UI/UX Design',
      icon: Layout,
      color: '#059669',
      bgColor: '#ECFDF5',
      description: 'Figma interactive prototypes, design systems, wireframes, and UX research.'
    },
    {
      category: 'Graphic Design',
      icon: Palette,
      color: '#D97706',
      bgColor: '#FFFBEB',
      description: 'Brand identity, modern logo marks, marketing collateral, and 3D visual assets.'
    },
    {
      category: 'Digital Marketing',
      icon: Megaphone,
      color: '#DC2626',
      bgColor: '#FEF2F2',
      description: 'SEO strategy, performance marketing campaigns, and conversion optimization.'
    },
    {
      category: 'Content Writing',
      icon: PenTool,
      color: '#0891B2',
      bgColor: '#ECFEFF',
      description: 'Technical copywriting, product manuals, brand copy, and narrative positioning.'
    },
    {
      category: 'Other',
      icon: Cpu,
      color: '#475569',
      bgColor: '#F1F5F9',
      description: 'DevOps, cloud migration, data engineering, custom APIs, or multi-disciplinary.'
    }
  ];

  const stepTitles = [
    'Outcome',
    'Category',
    'Details',
    'Budget',
    'Timeline',
    'Review'
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyAiSample = () => {
    setFormData(prev => ({
      ...prev,
      outcomeDescription:
        'I need a modern, responsive website for my fine dining restaurant where customers can view our seasonal chef menu, reserve tables online with real-time confirmation, and browse private events with 3D interior photos.',
      title: prev.title || 'Fine Dining Restaurant Website & Booking Flow',
      detailedDescription:
        'We require an elegant, fast-loading customer portal with real-time reservation integration (SevenRooms or custom calendar), multi-language menu filtering, and mobile-optimized ordering flow.'
    }));
  };

  const handleSubmit = (isDraft = false) => {
    if (isDraft) {
      navigate('/work');
      return;
    }
    const newId = createWorkRequest({
      ...formData,
      title: formData.title || formData.outcomeDescription.slice(0, 45) + '...'
    });
    navigate(`/submitted/${newId}`);
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', paddingBottom: 'var(--space-12)' }}>
      {/* Modern Stepper Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={step === 1 ? () => navigate('/dashboard') : handlePrev}
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft size={14} />
            <span>{step === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          {/* Stepper Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {stepTitles.map((t, idx) => {
              const stepNum = idx + 1;
              const isActive = step === stepNum;
              const isPassed = step > stepNum;

              return (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: isActive
                      ? 'var(--brand-subtle)'
                      : isPassed
                      ? '#ECFDF5'
                      : 'var(--bg-subtle)',
                    color: isActive
                      ? 'var(--brand-primary)'
                      : isPassed
                      ? '#059669'
                      : 'var(--text-tertiary)',
                    border: isActive
                      ? '1px solid var(--brand-border)'
                      : '1px solid transparent'
                  }}
                >
                  <span>{stepNum}.</span>
                  <span>{t}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Thin Progress Track */}
        <div
          style={{
            height: '4px',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'var(--brand-gradient)',
              width: `${(step / totalSteps) * 100}%`,
              transition: 'width 300ms ease-out'
            }}
          />
        </div>
      </div>

      {/* STEP 1: WHAT DO YOU NEED? */}
      {step === 1 && (
        <div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Step 1 of 6 • Objective Definition
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              What would you like us to get done?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Describe the business outcome you need. You don’t have to know the technical architecture.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <textarea
              className="form-textarea"
              rows={6}
              placeholder="e.g. I need a modern, high-converting website for my restaurant where customers can see our menu, reserve a table, and view our private events space..."
              value={formData.outcomeDescription}
              onChange={(e) => setFormData({ ...formData, outcomeDescription: e.target.value })}
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                padding: '16px',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)'
              }}
              autoFocus
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'var(--space-4)',
                paddingTop: 'var(--space-3)',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleApplyAiSample}
                style={{
                  background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                  color: 'var(--brand-primary)',
                  fontWeight: 600,
                  border: '1px solid var(--brand-border)'
                }}
              >
                <Sparkles size={14} color="#4F46E5" />
                <span>Help me describe this (AI Assistant)</span>
              </button>

              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {formData.outcomeDescription.length} characters
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary btn-lg"
              disabled={!formData.outcomeDescription.trim()}
              onClick={handleNext}
            >
              <span>Continue to Category</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CATEGORY */}
      {step === 2 && (
        <div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Step 2 of 6 • Specialization
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              What type of work is this?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              AssignX pairs you with a specialized Supervisor who manages this exact discipline.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-8)'
            }}
          >
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = formData.category === cat.category;

              return (
                <div
                  key={cat.category}
                  onClick={() => setFormData({ ...formData, category: cat.category })}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: `1.5px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-4) var(--space-5)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    boxShadow: isSelected ? '0 0 0 3px var(--brand-glow)' : 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transform: isSelected ? 'translateY(-2px)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: cat.bgColor,
                        color: cat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    {isSelected && (
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--brand-primary)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Check size={13} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>
                      {cat.category}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handlePrev}>
              Back
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleNext}>
              <span>Continue to Details</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DETAILS */}
      {step === 3 && (
        <div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Step 3 of 6 • Specifications
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              Work Details & Requirements
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Help your supervisor formulate milestones, deliverables, and resource allocations.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <div className="form-group">
              <label className="form-label">Project Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Fine Dining Restaurant Website & Table Booking Engine"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Scope or Requirements</label>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Mention specific features, target audience, integration needs, or success metrics..."
                value={formData.detailedDescription}
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              />
            </div>

            {/* Progressive Disclosure */}
            {!showOptionalFields ? (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setShowOptionalFields(true)}
                style={{ color: 'var(--brand-primary)', fontWeight: 600, margin: 'var(--space-2) 0' }}
              >
                <Plus size={14} />
                <span>Add reference links, attachments, or tech preferences (Optional)</span>
              </button>
            ) : (
              <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label">Reference Links or Inspiration (Optional)</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://example.com or Figma prototype link"
                    value={formData.referenceLinks[0]}
                    onChange={(e) => setFormData({ ...formData, referenceLinks: [e.target.value] })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Technologies (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Next.js, React, Node, Shopify, or Leave it to Supervisor"
                    value={formData.preferredTech}
                    onChange={(e) => setFormData({ ...formData, preferredTech: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Attachments (Optional)</label>
                  <div
                    onClick={() => {
                      const demoFile = `Scope_Brief_${Date.now().toString().slice(-4)}.pdf`;
                      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, demoFile] }));
                    }}
                    style={{
                      border: '2px dashed var(--border-default)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '20px',
                      textAlign: 'center',
                      backgroundColor: 'var(--bg-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <UploadCloud size={24} color="var(--brand-primary)" style={{ margin: '0 auto 6px' }} />
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Click to attach mockups, briefs, or assets</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PDF, ZIP, PNG, DOCX up to 50MB</div>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                      {formData.attachments.map((att, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '12px',
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--bg-subtle)',
                            border: '1px solid var(--border-default)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          📎 {att}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handlePrev}>
              Back
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleNext}>
              <span>Continue to Budget</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: BUDGET */}
      {step === 4 && (
        <div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Step 4 of 6 • Financial Allocation
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              What budget do you have in mind?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              AssignX protects your funds in escrow. Payments are released only when you approve milestones.
            </p>
          </div>

          {/* Quick preset chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-5)' }}>
            {[30000, 60000, 100000, 180000].map(amount => (
              <button
                key={amount}
                type="button"
                className="btn btn-secondary btn-sm"
                style={{
                  borderRadius: 'var(--radius-full)',
                  borderColor: formData.budgetFixed === amount ? 'var(--brand-primary)' : undefined,
                  backgroundColor: formData.budgetFixed === amount ? 'var(--brand-subtle)' : undefined,
                  color: formData.budgetFixed === amount ? 'var(--brand-primary)' : undefined
                }}
                onClick={() => setFormData({ ...formData, budgetType: 'fixed', budgetFixed: amount })}
              >
                ₹{amount.toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
            {/* Range */}
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-4)',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--bg-surface)',
                border: `1.5px solid ${formData.budgetType === 'range' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-xl)',
                cursor: 'pointer',
                boxShadow: formData.budgetType === 'range' ? '0 0 0 3px var(--brand-glow)' : 'var(--shadow-sm)'
              }}
            >
              <input
                type="radio"
                name="budget_type"
                checked={formData.budgetType === 'range'}
                onChange={() => setFormData({ ...formData, budgetType: 'range' })}
                style={{ marginTop: '3px', accentColor: 'var(--brand-primary)' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  Budget Range
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Give a flexible minimum and maximum for milestone structuring.
                </p>

                {formData.budgetType === 'range' && (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Min (₹)</span>
                      <input
                        type="number"
                        className="form-input"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({ ...formData, budgetMin: Number(e.target.value) })}
                      />
                    </div>
                    <span style={{ color: 'var(--text-tertiary)', marginTop: '16px' }}>—</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Max (₹)</span>
                      <input
                        type="number"
                        className="form-input"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                )}
              </div>
            </label>

            {/* Fixed */}
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-4)',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--bg-surface)',
                border: `1.5px solid ${formData.budgetType === 'fixed' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-xl)',
                cursor: 'pointer',
                boxShadow: formData.budgetType === 'fixed' ? '0 0 0 3px var(--brand-glow)' : 'var(--shadow-sm)'
              }}
            >
              <input
                type="radio"
                name="budget_type"
                checked={formData.budgetType === 'fixed'}
                onChange={() => setFormData({ ...formData, budgetType: 'fixed' })}
                style={{ marginTop: '3px', accentColor: 'var(--brand-primary)' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  Fixed Budget
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  A firm project ceiling for the entire scope.
                </p>

                {formData.budgetType === 'fixed' && (
                  <div style={{ maxWidth: '280px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Amount (₹)</span>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.budgetFixed}
                      onChange={(e) => setFormData({ ...formData, budgetFixed: Number(e.target.value) })}
                    />
                  </div>
                )}
              </div>
            </label>

            {/* Estimate by AssignX */}
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-4)',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--bg-surface)',
                border: `1.5px solid ${formData.budgetType === 'estimate' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-xl)',
                cursor: 'pointer',
                boxShadow: formData.budgetType === 'estimate' ? '0 0 0 3px var(--brand-glow)' : 'var(--shadow-sm)'
              }}
            >
              <input
                type="radio"
                name="budget_type"
                checked={formData.budgetType === 'estimate'}
                onChange={() => setFormData({ ...formData, budgetType: 'estimate' })}
                style={{ marginTop: '3px', accentColor: 'var(--brand-primary)' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  I need AssignX to estimate it
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Your assigned supervisor will analyze the requirement and provide a transparent quotation.
                </p>
              </div>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handlePrev}>
              Back
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleNext}>
              <span>Continue to Timeline</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: TIMELINE */}
      {step === 5 && (
        <div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Step 5 of 6 • Delivery Horizon
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              When do you need this completed?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Supervisors structure sprints and quality milestones around your release date.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--bg-surface)',
                border: `1.5px solid ${formData.timelineType === 'asap' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-xl)',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="timeline_type"
                checked={formData.timelineType === 'asap'}
                onChange={() => setFormData({ ...formData, timelineType: 'asap' })}
                style={{ accentColor: 'var(--brand-primary)' }}
              />
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  As soon as possible
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Fastest delivery timeline under dedicated supervisor management.
                </p>
              </div>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-4)',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--bg-surface)',
                border: `1.5px solid ${formData.timelineType === 'deadline' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-xl)',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="timeline_type"
                checked={formData.timelineType === 'deadline'}
                onChange={() => setFormData({ ...formData, timelineType: 'deadline' })}
                style={{ marginTop: '3px', accentColor: 'var(--brand-primary)' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  Specific Target Date
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  Pick your hard launch or release deadline.
                </p>

                {formData.timelineType === 'deadline' && (
                  <div style={{ maxWidth: '240px' }}>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.deadlineDate}
                      onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--bg-surface)',
                border: `1.5px solid ${formData.timelineType === 'flexible' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-xl)',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="timeline_type"
                checked={formData.timelineType === 'flexible'}
                onChange={() => setFormData({ ...formData, timelineType: 'flexible' })}
                style={{ accentColor: 'var(--brand-primary)' }}
              />
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Flexible Timeline
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Standard pace focused on thorough QA and iterative sprints.
                </p>
              </div>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handlePrev}>
              Back
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleNext}>
              <span>Review Work Request</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: REVIEW */}
      {step === 6 && (
        <div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Step 6 of 6 • Summary & Handoff
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              Confirm Your Work Request
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Upon submission, AssignX assigns a verified supervisor who will assemble the team and formulate milestones.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div className="card" style={{ padding: 'var(--space-5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  Scope Brief
                </span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setStep(1)}
                  style={{ color: 'var(--brand-primary)', fontWeight: 600 }}
                >
                  Edit
                </button>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {formData.title || 'Untitled Work Request'}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {formData.outcomeDescription}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-4)'
              }}
            >
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Category
                  </span>
                  <button className="btn btn-ghost btn-sm" onClick={() => setStep(2)} style={{ color: 'var(--brand-primary)' }}>
                    Edit
                  </button>
                </div>
                <span
                  style={{
                    backgroundColor: 'var(--brand-subtle)',
                    color: 'var(--brand-primary)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: 700
                  }}
                >
                  {formData.category}
                </span>
              </div>

              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Budget Allocation
                  </span>
                  <button className="btn btn-ghost btn-sm" onClick={() => setStep(4)} style={{ color: 'var(--brand-primary)' }}>
                    Edit
                  </button>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {formData.budgetType === 'fixed' && `₹${formData.budgetFixed?.toLocaleString('en-IN')}`}
                  {formData.budgetType === 'range' &&
                    `₹${formData.budgetMin?.toLocaleString('en-IN')} – ₹${formData.budgetMax?.toLocaleString('en-IN')}`}
                  {formData.budgetType === 'estimate' && 'AssignX Proposal'}
                </div>
              </div>

              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Target Timeline
                  </span>
                  <button className="btn btn-ghost btn-sm" onClick={() => setStep(5)} style={{ color: 'var(--brand-primary)' }}>
                    Edit
                  </button>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {formData.timelineType === 'asap' && 'ASAP Delivery'}
                  {formData.timelineType === 'deadline' && (formData.deadlineDate || 'Target Date')}
                  {formData.timelineType === 'flexible' && 'Flexible Pace'}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--border-default)'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleSubmit(true)}
            >
              Save as Draft
            </button>

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => handleSubmit(false)}
            >
              <span>Submit Work Request</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
