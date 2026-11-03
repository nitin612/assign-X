/* Profile & Settings Page — Connected to AssignX Backend API */
import React, { useState, useEffect } from 'react';
import {
  User,
  Building2,
  CreditCard,
  Bell,
  CheckCircle2,
  Lock,
  Plus,
  ShieldCheck,
  Trash2,
  KeyRound,
  AlertCircle,
  Copy,
  Laptop
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { userService, authService, type PaymentMethodItem } from '../services';

export const ProfileSettingsPage: React.FC = () => {
  const { currentUser, refreshUserProfile } = useApp();
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: currentUser?.firstName || 'Alex',
    lastName: currentUser?.lastName || 'Vance',
    email: currentUser?.email || 'alex.vance@apexgroup.com',
    phone: currentUser?.phoneE164 || currentUser?.phone || '+91 98200 55112',
    designation: currentUser?.designation || 'Managing Director',
    department: currentUser?.department || 'Executive Operations',
    timezone: currentUser?.timezone || 'Asia/Kolkata (IST +5:30)',
  });

  // 2. Company Information State
  const [companyInfo, setCompanyInfo] = useState({
    companyName: currentUser?.clientProfile?.businessName || 'Apex Hospitality Group Pvt. Ltd.',
    gstNumber: currentUser?.clientProfile?.gstin || '27AABCA1234F1Z8',
    registeredAddress: currentUser?.clientProfile?.registeredAddress || 'Level 14, Tower B, Peninsula Business Park, Lower Parel',
    city: currentUser?.clientProfile?.city || 'Mumbai',
    country: currentUser?.clientProfile?.country || 'India',
    website: currentUser?.clientProfile?.website || 'https://apexgroup.com',
    currency: currentUser?.clientProfile?.currency || 'INR (₹)',
  });

  // 3. Password State
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // 4. 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(currentUser?.twoFactorEnabled ?? false);
  const [show2FASetupModal, setShow2FASetupModal] = useState(false);
  const [setup2FAData, setSetup2FAData] = useState<{ secret: string; otpauthUrl: string; qrCodeUrl?: string } | null>(null);
  const [verify2FACode, setVerify2FACode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // 5. Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItem[]>([]);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPaymentForm, setNewPaymentForm] = useState({
    type: 'card' as 'card' | 'netbanking',
    brand: 'VISA',
    last4: '',
    expiryMonth: 12,
    expiryYear: 2028,
    bankName: '',
    accountMasked: '',
    isDefault: false,
  });

  // 6. Notification Preferences State
  const [notificationPrefs, setNotificationPrefs] = useState({
    milestoneNotify: true,
    supervisorMessageNotify: true,
    escrowInvoiceNotify: true,
    weeklyDigestNotify: false,
  });

  // 7. Active Sessions State
  const [sessions, setSessions] = useState<any[]>([]);

  // Fetch all user profile data from backend on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch user profile
      const profile = await userService.getProfile();
      if (profile) {
        setPersonalInfo({
          firstName: profile.firstName || profile.fullName?.split(' ')[0] || 'Alex',
          lastName: profile.lastName || profile.fullName?.split(' ').slice(1).join(' ') || 'Vance',
          email: profile.email || '',
          phone: profile.phoneE164 || profile.phone || '',
          designation: profile.designation || 'Managing Director',
          department: profile.department || 'Executive Operations',
          timezone: profile.timezone || 'Asia/Kolkata (IST +5:30)',
        });
        setTwoFactorEnabled(Boolean(profile.twoFactorEnabled));
      }

      // 2. Fetch company info
      const company = await userService.getCompany();
      if (company && company.companyName) {
        setCompanyInfo({
          companyName: company.companyName || '',
          gstNumber: company.gstNumber || '',
          registeredAddress: company.registeredAddress || '',
          city: company.city || '',
          country: company.country || 'India',
          website: company.website || '',
          currency: company.currency || 'INR (₹)',
        });
      }

      // 3. Fetch payment methods
      const methods = await userService.getPaymentMethods();
      if (methods && Array.isArray(methods)) {
        setPaymentMethods(methods);
      }

      // 4. Fetch notification preferences
      const prefs = await userService.getNotificationPreferences();
      if (prefs) {
        setNotificationPrefs({
          milestoneNotify: Boolean(prefs.milestoneNotify),
          supervisorMessageNotify: Boolean(prefs.supervisorMessageNotify),
          escrowInvoiceNotify: Boolean(prefs.escrowInvoiceNotify),
          weeklyDigestNotify: Boolean(prefs.weeklyDigestNotify),
        });
      }

      // 5. Fetch sessions
      const sessionList = await userService.getSessions();
      if (sessionList && Array.isArray(sessionList)) {
        setSessions(sessionList);
      }
    } catch {
      // Offline fallback: keep prefilled defaults
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSaveSuccess(msg);
    setErrorMessage(null);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setSaveSuccess(null);
  };

  // 1. Save Personal Info
  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await userService.updatePersonalInfo(personalInfo);
      await refreshUserProfile();
      showSuccess('Personal information updated successfully.');
    } catch (err: any) {
      showError(err?.message || 'Failed to update personal information.');
    }
  };

  // 2. Save Company Info
  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await userService.updateCompany(companyInfo);
      showSuccess('Company & GST details saved successfully.');
    } catch (err: any) {
      showError(err?.message || 'Failed to update company information.');
    }
  };

  // 3. Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!passwords.currentPassword) {
      showError('Please enter your current password.');
      return;
    }
    if (passwords.newPassword.length < 8) {
      showError('New password must be at least 8 characters long.');
      return;
    }
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      showError('New passwords do not match.');
      return;
    }

    try {
      await userService.changePassword(passwords.currentPassword, passwords.newPassword);
      setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      showSuccess('Password updated successfully.');
    } catch (err: any) {
      showError(err?.message || 'Failed to update password.');
    }
  };

  // 4. Start 2FA Setup
  const handleStart2FASetup = async () => {
    try {
      const data = await authService.setup2FA();
      setSetup2FAData(data);
      setShow2FASetupModal(true);
      setVerify2FACode('');
      setBackupCodes([]);
    } catch (err: any) {
      showError(err?.message || 'Could not initiate 2FA setup.');
    }
  };

  // 4b. Confirm 2FA Code
  const handleConfirm2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verify2FACode.trim()) return;
    try {
      const res = await authService.enable2FA(verify2FACode.trim());
      setTwoFactorEnabled(true);
      if (res?.backupCodes) {
        setBackupCodes(res.backupCodes);
      }
      showSuccess('Two-factor authentication enabled successfully!');
    } catch (err: any) {
      showError(err?.message || 'Invalid verification code.');
    }
  };

  // 5. Add Payment Method
  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await userService.addPaymentMethod(newPaymentForm);
      if (res?.paymentMethod) {
        setPaymentMethods(prev => [res.paymentMethod, ...prev]);
      }
      setShowAddPaymentModal(false);
      showSuccess('Payment method added successfully.');
    } catch (err: any) {
      showError(err?.message || 'Failed to add payment method.');
    }
  };

  // 5b. Set Default Payment Method
  const handleSetDefaultPayment = async (id: string) => {
    try {
      await userService.setDefaultPaymentMethod(id);
      setPaymentMethods(prev =>
        prev.map(p => ({ ...p, isDefault: p.id === id }))
      );
      showSuccess('Primary payment method updated.');
    } catch (err: any) {
      showError(err?.message || 'Failed to update default payment method.');
    }
  };

  // 5c. Delete Payment Method
  const handleDeletePayment = async (id: string) => {
    try {
      await userService.deletePaymentMethod(id);
      setPaymentMethods(prev => prev.filter(p => p.id !== id));
      showSuccess('Payment method removed.');
    } catch (err: any) {
      showError(err?.message || 'Failed to remove payment method.');
    }
  };

  // 6. Save Notification Preferences
  const handleSaveNotificationPrefs = async () => {
    try {
      await userService.updateNotificationPreferences(notificationPrefs);
      showSuccess('Notification preferences saved successfully.');
    } catch (err: any) {
      showError(err?.message || 'Failed to update notification preferences.');
    }
  };

  // 7. Revoke Session
  const handleRevokeSession = async (sessionId: string) => {
    try {
      await userService.revokeSession(sessionId);
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      showSuccess('Session revoked.');
    } catch (err: any) {
      showError(err?.message || 'Failed to revoke session.');
    }
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
                      ? 'bg-indigo-50/90 dark:bg-indigo-950/50 text-[#6366F1] dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-900/80 shadow-2xs'
                      : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800/40 border border-transparent'
                      }`}
                  >
                    <Icon size={18} className={`shrink-0 mt-0.5 ${isActive ? 'text-[#6366F1] dark:text-indigo-400' : 'text-slate-400 dark:text-zinc-500'}`} />
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-bold leading-tight ${isActive ? 'text-[#6366F1] dark:text-indigo-400' : 'text-slate-950 dark:text-white'}`}>
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
          <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/40 dark:from-zinc-900/90 dark:to-zinc-900/50 border border-indigo-100 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold flex items-center justify-center text-sm shadow-xs overflow-hidden">
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  `${personalInfo.firstName[0] || 'A'}${personalInfo.lastName[0] || 'V'}`
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-950 dark:text-white truncate">
                  {currentUser?.fullName || `${personalInfo.firstName} ${personalInfo.lastName}`}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                  {currentUser?.clientTier || 'Enterprise Client Tier'}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-orange-100/80 dark:border-zinc-800 text-[11.5px]">
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                <span>Escrow Protection:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {currentUser?.escrowProtection || '100% Safeguarded'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                <span>Active Supervisors:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {currentUser?.activeSupervisorsCount || 4} Assigned
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-400">
                <span>Account Manager:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {currentUser?.accountManager?.name || 'Arjun Mehta'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Form & Detail Cards */}
        <div className="flex flex-col gap-6">
          {saveSuccess && (
            <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs font-medium animate-fade-in shadow-2xs">
              <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{saveSuccess}</span>
            </div>
          )}

          {errorMessage && (
            <div className="flex items-center gap-2.5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 rounded-2xl text-rose-800 dark:text-rose-300 text-xs font-medium animate-fade-in shadow-2xs">
              <AlertCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. PERSONAL INFORMATION */}
          {activeSection === 'personal' && (
            <form onSubmit={handleSavePersonal} className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)] flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-150 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    Personal Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Your personal contact credentials and communication settings.
                  </p>
                </div>
                <button type="submit" disabled={isLoading} className="btn btn-primary btn-sm">
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
            <form onSubmit={handleSaveCompany} className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)] flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-150 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    Company & Entity Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Legal business entity details used for automated B2B invoicing and escrow agreements.
                  </p>
                </div>
                <button type="submit" disabled={isLoading} className="btn btn-primary btn-sm">
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
                    className="form-input font-mono uppercase"
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
              {/* 2FA Card */}
              <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                      Two-Factor Authentication (2FA)
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Protect milestone payments, project changes, and sensitive deliverables.
                    </p>
                  </div>
                  {!twoFactorEnabled && (
                    <button
                      type="button"
                      onClick={handleStart2FASetup}
                      className="btn btn-secondary btn-sm"
                    >
                      <KeyRound size={14} />
                      <span>Setup 2FA</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${twoFactorEnabled ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-950 dark:text-white">Authenticator App (TOTP)</div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                        {twoFactorEnabled ? 'Google Authenticator or 1Password active' : 'Not configured yet'}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${twoFactorEnabled ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                    {twoFactorEnabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Password Card */}
              <form onSubmit={handleChangePassword} className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)]">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                  Password & Credentials
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mb-5">
                  Ensure your account uses a secure password with at least 8 characters.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-group md:col-span-2">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="form-input"
                      value={passwords.currentPassword}
                      onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      placeholder="Minimum 8 chars"
                      className="form-input"
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      className="form-input"
                      value={passwords.confirmNewPassword}
                      onChange={(e) => setPasswords({ ...passwords, confirmNewPassword: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-secondary btn-sm">
                  Update Password
                </button>
              </form>

              {/* Active Sessions Card */}
              {sessions.length > 0 && (
                <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)]">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                    Active Devices & Sessions
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
                    Devices currently signed in to your AssignX account.
                  </p>

                  <div className="space-y-3">
                    {sessions.map((s) => (
                      <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-3">
                          <Laptop className="w-5 h-5 text-slate-500" />
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <span>{s.device || 'Chrome Browser'}</span>
                              {s.isCurrent && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                                  Current Device
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                              IP: {s.ipAddress || '127.0.0.1'} · Active
                            </div>
                          </div>
                        </div>

                        {!s.isCurrent && (
                          <button
                            type="button"
                            onClick={() => handleRevokeSession(s.id)}
                            className="text-xs text-rose-500 hover:text-rose-700 cursor-pointer"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowAddPaymentModal(true)}
                  >
                    <Plus size={14} />
                    <span>Add Method</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.length === 0 ? (
                    <div className="col-span-2 p-6 text-center text-xs text-slate-500 dark:text-zinc-400 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
                      No payment methods configured. Click "Add Method" to save a corporate card or NetBanking account.
                    </div>
                  ) : (
                    paymentMethods.map(pm => (
                      <div
                        key={pm.id}
                        className={`p-4 rounded-xl border flex items-center justify-between ${pm.isDefault
                          ? 'border-orange-200 dark:border-orange-900/60 bg-orange-50/40 dark:bg-orange-950/20'
                          : 'border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-8 rounded-md bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center">
                            {pm.brand || pm.type.toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                              {pm.type === 'card'
                                ? `${pm.brand || 'Card'} •••• ${pm.last4 || '4242'}`
                                : `${pm.bankName || 'NetBanking'} (${pm.accountMasked || '•••• 8812'})`}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                              {pm.isDefault ? 'Primary Escrow Method' : 'Backup Method'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {pm.isDefault ? (
                            <span className="text-[11px] font-bold text-[#EE6B50] dark:text-orange-400">
                              Default
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultPayment(pm.id)}
                              className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer underline"
                            >
                              Make Default
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeletePayment(pm.id)}
                            className="text-slate-400 hover:text-rose-500 cursor-pointer ml-1"
                            title="Remove payment method"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
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
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={notificationPrefs.milestoneNotify}
                    onChange={(e) => setNotificationPrefs({ ...notificationPrefs, milestoneNotify: e.target.checked })}
                    className="mt-1 accent-[#EE6B50] w-4 h-4 rounded-md cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">Milestone submissions & change requests</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">When your supervisor submits work for review.</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={notificationPrefs.supervisorMessageNotify}
                    onChange={(e) => setNotificationPrefs({ ...notificationPrefs, supervisorMessageNotify: e.target.checked })}
                    className="mt-1 accent-[#EE6B50] w-4 h-4 rounded-md cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">Supervisor direct messages</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">Instant email alert when a message is posted to your thread.</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={notificationPrefs.escrowInvoiceNotify}
                    onChange={(e) => setNotificationPrefs({ ...notificationPrefs, escrowInvoiceNotify: e.target.checked })}
                    className="mt-1 accent-[#EE6B50] w-4 h-4 rounded-md cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">Escrow payment confirmations & tax receipts</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">PDF invoices automatically delivered to your inbox.</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={notificationPrefs.weeklyDigestNotify}
                    onChange={(e) => setNotificationPrefs({ ...notificationPrefs, weeklyDigestNotify: e.target.checked })}
                    className="mt-1 accent-[#EE6B50] w-4 h-4 rounded-md cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">Weekly work progress digest</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">A consolidated summary of ongoing milestone velocity.</div>
                  </div>
                </div>
              </div>

              <button type="button" className="btn btn-primary btn-sm" onClick={handleSaveNotificationPrefs}>
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {show2FASetupModal && setup2FAData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#15151A] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl text-left">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#EE6B50]" />
              <span>Configure Authenticator App</span>
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Scan this QR code with Google Authenticator, 1Password, or Authy, or copy the manual entry key.
            </p>

            {backupCodes.length > 0 ? (
              <div className="mt-4">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 mb-3">
                  2FA has been enabled! Store these one-time backup recovery codes safely:
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-slate-100 dark:bg-zinc-900 p-3 rounded-xl">
                  {backupCodes.map((code, idx) => (
                    <div key={idx} className="text-slate-800 dark:text-slate-200">{code}</div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShow2FASetupModal(false);
                    setSetup2FAData(null);
                  }}
                  className="mt-4 w-full py-2 bg-gradient-to-r from-[#FA795C] to-[#D95236] text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="flex justify-center p-3 bg-white rounded-xl border border-slate-200">
                  {setup2FAData.qrCodeUrl ? (
                    <img src={setup2FAData.qrCodeUrl} alt="2FA QR Code" className="w-40 h-40" />
                  ) : (
                    <div className="text-xs text-slate-600 text-center font-mono py-8">
                      {setup2FAData.otpauthUrl}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                  <span className="font-mono text-xs text-slate-700 dark:text-slate-300 truncate max-w-[260px]">
                    {setup2FAData.secret}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(setup2FAData.secret);
                      setCopiedSecret(true);
                      setTimeout(() => setCopiedSecret(false), 2000);
                    }}
                    className="text-xs text-[#EE6B50] flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Copy size={13} />
                    <span>{copiedSecret ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <form onSubmit={handleConfirm2FA} className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Enter 6-digit confirmation code:
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={verify2FACode}
                    onChange={(e) => setVerify2FACode(e.target.value)}
                    placeholder="123456"
                    className="w-full text-center tracking-widest font-mono font-bold text-base px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  />
                  <button
                    type="submit"
                    disabled={!verify2FACode.trim()}
                    className="w-full py-2 bg-gradient-to-r from-[#FA795C] to-[#D95236] text-white rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-60"
                  >
                    Verify & Activate 2FA
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => setShow2FASetupModal(false)}
                  className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#15151A] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl text-left">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#EE6B50]" />
              <span>Add Payment Method</span>
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Save a corporate card or NetBanking account for escrow funding.
            </p>

            <form onSubmit={handleAddPayment} className="mt-4 space-y-3">
              <div>
                <label className="form-label">Payment Type</label>
                <select
                  value={newPaymentForm.type}
                  onChange={(e) => setNewPaymentForm({ ...newPaymentForm, type: e.target.value as any })}
                  className="form-input"
                >
                  <option value="card">Credit / Debit Card</option>
                  <option value="netbanking">Corporate NetBanking</option>
                </select>
              </div>

              {newPaymentForm.type === 'card' ? (
                <>
                  <div>
                    <label className="form-label">Card Brand</label>
                    <input
                      type="text"
                      placeholder="VISA / Mastercard"
                      value={newPaymentForm.brand}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, brand: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Last 4 Digits</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="4242"
                      value={newPaymentForm.last4}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, last4: e.target.value })}
                      className="form-input font-mono"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="form-label">Expiry Month</label>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={newPaymentForm.expiryMonth}
                        onChange={(e) => setNewPaymentForm({ ...newPaymentForm, expiryMonth: parseInt(e.target.value) })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Expiry Year</label>
                      <input
                        type="number"
                        min={2026}
                        max={2040}
                        value={newPaymentForm.expiryYear}
                        onChange={(e) => setNewPaymentForm({ ...newPaymentForm, expiryYear: parseInt(e.target.value) })}
                        className="form-input"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="form-label">Bank Name</label>
                    <input
                      type="text"
                      placeholder="HDFC / ICICI / Axis Bank"
                      value={newPaymentForm.bankName}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, bankName: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Account Mask (e.g. •••• 8812)</label>
                    <input
                      type="text"
                      placeholder="•••• 8812"
                      value={newPaymentForm.accountMasked}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, accountMasked: e.target.value })}
                      className="form-input font-mono"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="setDefaultCheckbox"
                  checked={newPaymentForm.isDefault}
                  onChange={(e) => setNewPaymentForm({ ...newPaymentForm, isDefault: e.target.checked })}
                  className="accent-[#EE6B50] w-4 h-4 rounded-md cursor-pointer"
                />
                <label htmlFor="setDefaultCheckbox" className="text-xs text-slate-700 dark:text-zinc-300 cursor-pointer">
                  Set as primary default for escrow milestones
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-2 bg-gradient-to-r from-[#FA795C] to-[#D95236] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
              >
                Save Payment Method
              </button>

              <button
                type="button"
                onClick={() => setShowAddPaymentModal(false)}
                className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage;
