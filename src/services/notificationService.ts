/* AssignX Notifications Service */
import { apiClient } from './apiClient';
import type { ApiNotificationItem } from './types';

export interface NotificationsListResponse {
  notifications: ApiNotificationItem[];
  unreadCount: number;
  total?: number;
}

export const notificationService = {
  /**
   * Get list of notifications with optional category filter
   */
  async getNotifications(category?: string, page = 1, limit = 50): Promise<NotificationsListResponse> {
    const params = new URLSearchParams();
    if (category && category !== 'all') {
      params.append('category', category);
    }
    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await apiClient.get<any>(`/notifications${query}`);

    // If backend returns array directly or { notifications, unreadCount }
    if (Array.isArray(res)) {
      return {
        notifications: res,
        unreadCount: res.filter((n: any) => !n.isRead).length,
      };
    }
    return {
      notifications: res?.notifications || res?.data?.notifications || [],
      unreadCount: res?.unreadCount ?? res?.data?.unreadCount ?? 0,
      total: res?.total,
    };
  },

  /**
   * Mark a single notification as read
   */
  async markAsRead(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient.patch(`/notifications/${id}/read`);
  },

  /**
   * Mark all unread notifications as read
   */
  async markAllAsRead(): Promise<{ success: boolean; message: string }> {
    return apiClient.patch('/notifications/read-all');
  },
};

