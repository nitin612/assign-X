/* Profile & Settings Page */
import React, { useState } from 'react';
import {
  User,
  Building2,
  CreditCard,
  Bell,
  CheckCircle2,
  Lock,
  Plus
} from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Alex',
    lastName: 'Vance',
    email: 'alex.vance@apexgroup.com',
    phone: '+91 98200 55112',
    designation: 'Managing Director'
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Apex Hospitality Group Pvt. Ltd.',
    gstNumber: '27AABCA1234F1Z8',
    registeredAddress: 'Level 14, Tower B, Peninsula Business Park, Lower Parel',
    city: 'Mumbai',
    country: 'India',
    website: 'https://apexgroup.com'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const sections = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'company', label: 'Company Information', icon: Building2 },
    { id: 'security', label: 'Security & Auth', icon: Lock },
    { id: 'billing', label: 'Billing & Invoicing', icon: CreditCard },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell }
  ];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Profile & Settings
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Manage your enterprise profile, billing entities, and account security.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(200px, 240px) 1fr',
          gap: 'var(--space-8)',
          alignItems: 'flex-start'
        }}
      >
        {/* Settings Sub-navigation Sidebar */}
        <div className="card" style={{ padding: 'var(--space-3)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {sections.map(s => {
              const Icon = s.icon;
              const isActive = activeSection === s.id;

              return (
                <button
                  key={s.id}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveSection(s.id)}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  <div className="sidebar-nav-item-content">
                    <Icon size={16} />
                    <span>{s.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Content */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          {saveSuccess && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 14px',
                backgroundColor: 'var(--status-success-bg)',
                border: '1px solid var(--status-success-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--status-success-text)',
                fontSize: '13px',
                marginBottom: 'var(--space-5)'
              }}
            >
              <CheckCircle2 size={16} />
              <span>Settings saved successfully.</span>
            </div>
          )}

          {activeSection === 'personal' && (
            <form onSubmit={handleSave}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                Personal Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Work Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                />
                <span className="form-hint">Used for all milestone notifications and invoice receipts.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Title / Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={personalInfo.designation}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, designation: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-3)' }}>
                Save Personal Changes
              </button>
            </form>
          )}

          {activeSection === 'company' && (
            <form onSubmit={handleSave}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                Company & Entity Information
              </h3>

              <div className="form-group">
                <label className="form-label">Company Legal Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={companyInfo.companyName}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">GSTIN / Tax Identification</label>
                <input
                  type="text"
                  className="form-input"
                  value={companyInfo.gstNumber}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, gstNumber: e.target.value })}
                />
                <span className="form-hint">Printed on all milestone tax invoices for input tax credit.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Registered Office Address</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={companyInfo.registeredAddress}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, registeredAddress: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-input"
                    value={companyInfo.city}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-input"
                    value={companyInfo.country}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-3)' }}>
                Save Company Details
              </button>
            </form>
          )}

          {activeSection === 'security' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                Security & Authentication
              </h3>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  backgroundColor: 'var(--bg-canvas)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-4)',
                  border: '1px solid var(--border-default)'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Two-Factor Authentication (2FA)</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Protect work requests and milestone approvals with authenticator codes.
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Enabled
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Change Password</label>
                <input type="password" placeholder="Current password" className="form-input" style={{ marginBottom: '8px' }} />
                <input type="password" placeholder="New strong password" className="form-input" />
              </div>

              <button className="btn btn-secondary" onClick={() => alert('Password updated.')}>
                Update Password
              </button>
            </div>
          )}

          {activeSection === 'billing' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                Payment Methods & Escrow Preferences
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: 'var(--space-5)' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CreditCard size={20} color="var(--brand-primary)" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>Corporate Visa •••• 4242</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Expires 09/28 • Default Payment Method</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Primary</span>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm" onClick={() => alert('Add payment modal')}>
                <Plus size={14} />
                <span>Add New Payment Method</span>
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                Email & In-App Notification Alerts
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { title: 'Milestone submissions & change requests', desc: 'When your supervisor submits work for review.' },
                  { title: 'Supervisor direct messages', desc: 'Instant email alert when a message is posted to your thread.' },
                  { title: 'Escrow payment confirmations & tax receipts', desc: 'PDF invoices automatically delivered to your inbox.' },
                  { title: 'Weekly work progress digest', desc: 'A consolidated summary of ongoing milestone velocity.' }
                ].map((pref, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ marginTop: '3px', accentColor: 'var(--brand-primary)' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{pref.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{pref.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              <button className="btn btn-primary" style={{ marginTop: 'var(--space-5)' }} onClick={handleSave}>
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
