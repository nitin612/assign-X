/* AssignX Users & Profile Settings Service */
import { apiClient } from './apiClient';
import type {
  UserProfile,
  PersonalInfoPayload,
  CompanyInfo,
  PaymentMethodItem,
  CreatePaymentMethodPayload,
  NotificationPreferences,
} from './types';

export const userService = {
  /**
   * Get full authenticated user profile with company, tier, and account manager
   */
  async getProfile(): Promise<UserProfile> {
    return apiClient.get<UserProfile>('/users/me');
  },

  /**
   * Update personal profile info (name, phone, designation, department, timezone).
   * Note: email cannot be changed and must never be sent in payload.
   */
  async updatePersonalInfo(payload: PersonalInfoPayload): Promise<{ success: boolean; message: string; user?: any }> {
    const { email: _email, ...safePayload } = payload as any;
    return apiClient.put('/users/me/personal-info', safePayload);
  },

  /**
   * Update avatar image URL
   */
  async updateAvatar(avatarUrl: string): Promise<{ success: boolean; message: string; avatarUrl: string }> {
    return apiClient.post('/users/me/avatar', { avatarUrl });
  },

  /**
   * Change account password verifying current password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    return apiClient.put('/users/me/password', {
      currentPassword,
      newPassword,
      confirmNewPassword: newPassword,
    });
  },

  /**
   * Get legal company entity, GSTIN, and billing address
   */
  async getCompany(): Promise<CompanyInfo> {
    return apiClient.get<CompanyInfo>('/users/me/company');
  },

  /**
   * Update legal company entity, GSTIN, and billing address
   */
  async updateCompany(payload: Partial<CompanyInfo>): Promise<{ success: boolean; message: string; company?: CompanyInfo }> {
    return apiClient.put('/users/me/company', payload);
  },

  /**
   * Get active logged-in sessions / devices
   */
  async getSessions(): Promise<any[]> {
    return apiClient.get<any[]>('/users/me/sessions');
  },

  /**
   * Revoke an active session
   */
  async revokeSession(sessionId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/users/me/sessions/${sessionId}`);
  },

  /**
   * List saved cards and corporate NetBanking methods
   */
  async getPaymentMethods(): Promise<PaymentMethodItem[]> {
    return apiClient.get<PaymentMethodItem[]>('/users/me/payment-methods');
  },

  /**
   * Add a new corporate card or NetBanking method
   */
  async addPaymentMethod(payload: CreatePaymentMethodPayload): Promise<{ success: boolean; message: string; paymentMethod: PaymentMethodItem }> {
    return apiClient.post('/users/me/payment-methods', payload);
  },

  /**
   * Set primary default payment method for milestone escrow
   */
  async setDefaultPaymentMethod(methodId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.patch(`/users/me/payment-methods/${methodId}/set-default`);
  },

  /**
   * Remove a payment method
   */
  async deletePaymentMethod(methodId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/users/me/payment-methods/${methodId}`);
  },

  /**
   * Get email and in-app notification preferences
   */
  async getNotificationPreferences(): Promise<NotificationPreferences> {
    return apiClient.get<NotificationPreferences>('/users/me/notification-preferences');
  },

  /**
   * Update notification preferences
   */
  async updateNotificationPreferences(payload: Partial<NotificationPreferences>): Promise<{ success: boolean; message: string; preferences: NotificationPreferences }> {
    return apiClient.put('/users/me/notification-preferences', payload);
  },
};

