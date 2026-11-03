/* AssignX API Client Types */

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  user?: UserProfile;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  requires2FA?: boolean;
  tempToken?: string;
  email?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phoneE164?: string;
  phone?: string;
  designation?: string;
  department?: string;
  timezone?: string;
  avatarUrl?: string;
  role: 'CLIENT' | 'SUPERVISOR' | 'DOER' | 'ADMIN' | string;
  status?: string;
  clientTier?: string;
  escrowProtection?: string;
  activeSupervisorsCount?: number;
  twoFactorEnabled?: boolean;
  accountManager?: {
    name: string;
    title: string;
    email: string;
    phone?: string;
  };
  clientProfile?: {
    id: string;
    businessName?: string;
    gstin?: string;
    registeredAddress?: string;
    city?: string;
    country?: string;
    website?: string;
    currency?: string;
    milestoneNotify?: boolean;
    supervisorMessageNotify?: boolean;
    escrowInvoiceNotify?: boolean;
    weeklyDigestNotify?: boolean;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
  expectedRole?: string;
}

export interface RegisterPayload {
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phoneE164?: string;
  dateOfBirth?: string;
  role?: string;
}

export interface SocialLoginPayload {
  provider: 'google' | 'github';
  idToken?: string;
  email?: string;
  name?: string;
}

export interface TwoFactorValidatePayload {
  email: string;
  code: string;
  tempToken?: string;
}

export interface CompanyInfo {
  companyName: string;
  gstNumber: string;
  registeredAddress: string;
  city: string;
  country: string;
  website: string;
  currency: string;
}

export interface PersonalInfoPayload {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  phoneE164?: string;
  designation?: string;
  department?: string;
  timezone?: string;
}

export interface PaymentMethodItem {
  id: string;
  userId: string;
  type: 'card' | 'netbanking' | string;
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
  accountMasked?: string;
  isDefault: boolean;
  createdAt?: string;
}

export interface CreatePaymentMethodPayload {
  type: 'card' | 'netbanking';
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
  accountMasked?: string;
  isDefault?: boolean;
}

export interface NotificationPreferences {
  milestoneNotify: boolean;
  supervisorMessageNotify: boolean;
  escrowInvoiceNotify: boolean;
  weeklyDigestNotify: boolean;
  notifyEmail?: boolean;
  notifyPush?: boolean;
  whatsappOptIn?: boolean;
}

export interface ApiNotificationItem {
  id: string;
  category: 'all' | 'work' | 'messages' | 'payments' | 'approvals' | 'system' | string;
  title: string;
  message: string;
  projectId?: string;
  projectTitle?: string;
  actionRoute?: string;
  isRead: boolean;
  createdAt: string;
}

export interface SupportTicketItem {
  id: string;
  userId: string;
  projectId?: string;
  projectTitle?: string;
  issueType: string;
  subject: string;
  description: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketPayload {
  projectId?: string;
  projectTitle?: string;
  issueType: string;
  subject: string;
  description: string;
}
