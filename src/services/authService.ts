/* AssignX Authentication Service */
import { apiClient } from './apiClient';
import type {
  LoginPayload,
  RegisterPayload,
  SocialLoginPayload,
  TwoFactorValidatePayload,
  UserProfile,
} from './types';

export interface AuthSuccessResult {
  message?: string;
  user?: UserProfile;
  accessToken?: string;
  refreshToken?: string;
  requires2FA?: boolean;
  tempToken?: string;
  email?: string;
}

export const authService = {
  /**
   * Log in with work email & password
   */
  async login(payload: LoginPayload): Promise<AuthSuccessResult> {
    const data = await apiClient.post<AuthSuccessResult>('/auth/login', payload);

    if (data.accessToken) {
      apiClient.setAccessToken(data.accessToken);
    }
    if (data.refreshToken) {
      apiClient.setRefreshToken(data.refreshToken);
    }
    if (data.user) {
      localStorage.setItem('assignx_logged_in', 'true');
    }

    return data;
  },

  /**
   * Register a new client account
   */
  async register(payload: RegisterPayload): Promise<AuthSuccessResult> {
    const data = await apiClient.post<AuthSuccessResult>('/auth/register', {
      name: payload.name || payload.fullName,
      fullName: payload.fullName || payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role || 'CLIENT',
      ...(payload.phoneE164 ? { phoneE164: payload.phoneE164 } : {}),
      ...(payload.dateOfBirth ? { dateOfBirth: payload.dateOfBirth } : {}),
    });

    if (data.accessToken) {
      apiClient.setAccessToken(data.accessToken);
    }
    if (data.refreshToken) {
      apiClient.setRefreshToken(data.refreshToken);
    }
    if (data.user) {
      localStorage.setItem('assignx_logged_in', 'true');
    }

    return data;
  },

  /**
   * Social OAuth login (Google / GitHub)
   */
  async socialLogin(payload: SocialLoginPayload): Promise<AuthSuccessResult> {
    const data = await apiClient.post<AuthSuccessResult>('/auth/social', payload);

    if (data.accessToken) {
      apiClient.setAccessToken(data.accessToken);
    }
    if (data.refreshToken) {
      apiClient.setRefreshToken(data.refreshToken);
    }
    if (data.user) {
      localStorage.setItem('assignx_logged_in', 'true');
    }

    return data;
  },

  /**
   * Request passwordless OTP code
   */
  async requestCode(email: string, purpose = 'LOGIN') {
    return apiClient.post('/auth/request-code', { email, purpose });
  },

  /**
   * Verify passwordless OTP code
   */
  async verifyCode(email: string, code: string, purpose = 'LOGIN') {
    const data = await apiClient.post<any>('/auth/verify-code', { email, code, purpose });
    if (data.accessToken) {
      apiClient.setAccessToken(data.accessToken);
    }
    if (data.refreshToken) {
      apiClient.setRefreshToken(data.refreshToken);
    }
    return data;
  },

  /**
   * Request password reset instructions
   */
  async forgotPassword(email: string) {
    return apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', { email });
  },

  /**
   * Reset password with reset token
   */
  async resetPassword(token: string, newPassword: string) {
    return apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', {
      token,
      newPassword,
      confirmPassword: newPassword,
    });
  },

  /**
   * Setup 2FA TOTP (generate secret and QR URL)
   */
  async setup2FA() {
    return apiClient.post<{ secret: string; otpauthUrl: string; qrCodeUrl?: string }>('/auth/2fa/setup');
  },

  /**
   * Enable 2FA by verifying 6-digit TOTP code
   */
  async enable2FA(code: string) {
    return apiClient.post<{ success: boolean; backupCodes: string[]; message: string }>('/auth/2fa/enable', {
      code,
    });
  },

  /**
   * Validate 2FA code during login challenge
   */
  async validate2FA(payload: TwoFactorValidatePayload): Promise<AuthSuccessResult> {
    const data = await apiClient.post<AuthSuccessResult>('/auth/2fa/validate', payload);

    if (data.accessToken) {
      apiClient.setAccessToken(data.accessToken);
    }
    if (data.refreshToken) {
      apiClient.setRefreshToken(data.refreshToken);
    }
    if (data.user) {
      localStorage.setItem('assignx_logged_in', 'true');
    }

    return data;
  },

  /**
   * Invalidate session and revoke refresh token
   */
  async logout() {
    const refreshToken = apiClient.getRefreshToken();
    try {
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      apiClient.clearTokens();
    }
  },

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated(): boolean {
    return Boolean(apiClient.getAccessToken());
  },
};
