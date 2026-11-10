/* AssignX Central API Client */

export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export class ApiError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode = 500, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

class ApiClient {
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  getAccessToken(): string | null {
    return localStorage.getItem('assignx_access_token');
  }

  setAccessToken(token: string | null): void {
    if (token) {
      localStorage.setItem('assignx_access_token', token);
    } else {
      localStorage.removeItem('assignx_access_token');
    }
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('assignx_refresh_token');
  }

  setRefreshToken(token: string | null): void {
    if (token) {
      localStorage.setItem('assignx_refresh_token', token);
    } else {
      localStorage.removeItem('assignx_refresh_token');
    }
  }

  clearTokens(): void {
    localStorage.removeItem('assignx_access_token');
    localStorage.removeItem('assignx_refresh_token');
    localStorage.removeItem('assignx_logged_in');
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach(cb => cb(token));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  private async tryRefreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        this.clearTokens();
        return null;
      }

      const data = await res.json();
      if (data?.accessToken) {
        this.setAccessToken(data.accessToken);
        if (data.refreshToken) {
          this.setRefreshToken(data.refreshToken);
        }
        return data.accessToken;
      }
      return null;
    } catch {
      return null;
    }
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    // Do not set Content-Type for FormData; browser will set multipart/form-data with proper boundary
    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const token = this.getAccessToken();
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 Unauthorized for token refresh
      if (response.status === 401 && retryCount === 0 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          const newToken = await this.tryRefreshToken();
          this.isRefreshing = false;

          if (newToken) {
            this.onRefreshed(newToken);
            return this.request<T>(endpoint, options, 1);
          }
        } else {
          return new Promise<T>((resolve, reject) => {
            this.addRefreshSubscriber(() => {
              this.request<T>(endpoint, options, 1)
                .then(resolve)
                .catch(reject);
            });
          });
        }
      }

      const contentType = response.headers.get('content-type');
      let data: any = null;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }

      if (!response.ok) {
        let errorMessage = 'Request failed';
        if (data && typeof data === 'object') {
          if (Array.isArray(data.message)) {
            errorMessage = data.message.join('. ');
          } else if (typeof data.message === 'string') {
            errorMessage = data.message;
          } else if (typeof data.error === 'string') {
            errorMessage = data.error;
          }
        }
        throw new ApiError(errorMessage, response.status, data);
      }

      return data as T;
    } catch (err: any) {
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError(err?.message || 'Network error connecting to AssignX server', 0, err);
    }
  }

  get<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }

  put<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }

  patch<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
  }

  delete<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  upload<T = any>(endpoint: string, formData: FormData, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
    });
  }
}

export const apiClient = new ApiClient();
