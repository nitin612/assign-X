/* Profile & Settings Page — Full Enterprise Responsive Experience */
import React, { useState } from 'react';
import {
  User,
  Building2,
  CreditCard,
  Bell,
  CheckCircle2,
  Lock,
  Plus,
  ShieldCheck
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
    designation: 'Managing Director',
    department: 'Executive Operations',
    timezone: 'Asia/Kolkata (IST +5:30)'
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Apex Hospitality Group Pvt. Ltd.',
    gstNumber: '27AABCA1234F1Z8',
    registeredAddress: 'Level 14, Tower B, Peninsula Business Park, Lower Parel',
    city: 'Mumbai',
    country: 'India',
    website: 'https://apexgroup.com',
    currency: 'INR (₹)'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const sections = [
    { id: 'personal', label: 'Personal Information', icon: User, desc: 'Your profile, contact and role' },
    { id: 'company', label: 'Company Information', icon: Building2, desc: 'Tax GSTIN, legal name and address' },
    { id: 'security', label: 'Security & Auth', icon: Lock, desc: 'Password, 2FA and active sessions' },
    { id: 'billing', label: 'Billing & Invoicing', icon: CreditCard, desc: 'Payment cards and escrow settings' },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell, desc: 'Email alerts and weekly digests' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="h-[46px] flex items-center">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-none">
              Profile & Settings
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-1">
            Manage your enterprise account, billing entities, escrow defaults, and security credentials.
          </p>
        </div>

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Left Column: Navigation & Status Card */}
        <div className="flex flex-col gap-4">
          {/* Section Navigation */}
          <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-2.5 shadow-[0_3px_12px_-1px_rgba(15,23,42,0.06),0_1px_4px_-1px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col gap-1">
              {sections.map(s => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;

                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl text-left w-full transition-all cursor-pointer ${isActive
                      ? 'bg-blue-50/90 dark:bg-blue-950/50 text-[#0052CC] dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/80 shadow-2xs'
                      : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800/40 border border-transparent'
                      }`}
                  >
                    <Icon size={18} className={`shrink-0 mt-0.5 ${isActive ? 'text-[#0052CC] dark:text-blue-400' : 'text-slate-400 dark:text-zinc-500'}`} />
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-bold leading-tight ${isActive ? 'text-[#0052CC] dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                        {s.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate mt-0.5 font-normal">
                        {s.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Summary Card */}
          <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-zinc-900/90 dark:to-zinc-900/50 border border-blue-100 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#0052CC] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                AV
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-950 dark:text-white truncate">Alex Vance</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">Enterprise Client Tier</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-blue-100/80 dark:border-zinc-800 text-[11.5px]">
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                <span>Escrow Protection:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Safeguarded</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                <span>Active Supervisors:</span>
                <span className="font-semibold text-slate-900 dark:text-white">4 Assigned</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                <span>Account Manager:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Arjun Mehta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Form & Detail Cards */}
        <div className="flex flex-col gap-6">
          {saveSuccess && (
            <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs font-medium animate-fade-in shadow-2xs">
              <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Your settings and preferences have been updated successfully across AssignX.</span>
            </div>
          )}

          {/* 1. PERSONAL INFORMATION */}
          {activeSection === 'personal' && (
            <form onSubmit={handleSave} className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)] flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-150 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    Personal Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Your personal contact credentials and communication settings.
                  </p>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <div className="form-group md:col-span-2">
                  <label className="form-label">Work Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  />
                  <span className="form-hint">Used for all milestone approvals, supervisor updates, and GST tax invoice receipts.</span>
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

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-input"
                    value={personalInfo.department}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, department: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Timezone</label>
                  <input
                    type="text"
                    className="form-input"
                    value={personalInfo.timezone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, timezone: e.target.value })}
                  />
                </div>
              </div>
            </form>
          )}

          {/* 2. COMPANY INFORMATION */}
          {activeSection === 'company' && (
            <form onSubmit={handleSave} className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)] flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-150 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    Company & Entity Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Legal business entity details used for automated B2B invoicing and escrow agreements.
                  </p>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Details
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group md:col-span-2">
                  <label className="form-label">Company Legal Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={companyInfo.companyName}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">GSTIN / Tax Identification Number</label>
                  <input
                    type="text"
                    className="form-input font-mono"
                    value={companyInfo.gstNumber}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, gstNumber: e.target.value })}
                  />
                  <span className="form-hint">Printed on all milestone tax invoices for input tax credit.</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Official Website</label>
                  <input
                    type="url"
                    className="form-input"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label className="form-label">Registered Office Address</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    value={companyInfo.registeredAddress}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, registeredAddress: e.target.value })}
                  />
                </div>

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
            </form>
          )}

          {/* 3. SECURITY & AUTHENTICATION */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)]">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                  Two-Factor Authentication (2FA)
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mb-5">
                  Protect milestone payments, project changes, and sensitive deliverables.
                </p>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-950 dark:text-white">Authenticator App (TOTP)</div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400">Google Authenticator or 1Password active</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Active
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)]">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                  Password & Credentials
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mb-5">
                  Ensure your account uses a secure password with at least 12 characters.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-group md:col-span-2">
                    <label className="form-label">Current Password</label>
                    <input type="password" placeholder="••••••••••••" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input type="password" placeholder="Minimum 12 chars" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" placeholder="Re-enter password" className="form-input" />
                  </div>
                </div>

                <button className="btn btn-secondary btn-sm" onClick={() => alert('Password updated.')}>
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* 4. BILLING & INVOICING */}
          {activeSection === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Payment Methods & Escrow Defaults
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      Cards and corporate bank accounts for milestone funding.
                    </p>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => alert('Add payment modal')}>
                    <Plus size={14} />
                    <span>Add Method</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-8 rounded-md bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center">
                        VISA
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Corporate Visa •••• 4242</div>
                        <div className="text-[11px] text-slate-500 dark:text-zinc-400">Expires 09/28 · Primary Escrow Card</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#0052CC] dark:text-blue-400">Default</span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-8 rounded-md bg-blue-800 text-white font-bold text-[11px] flex items-center justify-center">
                        HDFC
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Direct Corporate NetBanking</div>
                        <div className="text-[11px] text-slate-500 dark:text-zinc-400">Current A/C •••• 8812</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-zinc-500">Backup</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. NOTIFICATION PREFERENCES */}
          {activeSection === 'notifications' && (
            <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)]">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                Email & In-App Alerts
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">
                Configure when and how your team receives project milestones and financial updates.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { title: 'Milestone submissions & change requests', desc: 'When your supervisor submits work for review.', def: true },
                  { title: 'Supervisor direct messages', desc: 'Instant email alert when a message is posted to your thread.', def: true },
                  { title: 'Escrow payment confirmations & tax receipts', desc: 'PDF invoices automatically delivered to your inbox.', def: true },
                  { title: 'Weekly work progress digest', desc: 'A consolidated summary of ongoing milestone velocity.', def: false }
                ].map((pref, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-start gap-3">
                    <input type="checkbox" defaultChecked={pref.def} className="mt-1 accent-[#0052CC] w-4 h-4 rounded-md cursor-pointer" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{pref.title}</div>
                      <div className="text-[11.5px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">{pref.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary btn-sm" onClick={handleSave}>
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
