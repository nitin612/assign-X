/* AssignX Support & Dispute Tickets Service */
import { apiClient } from './apiClient';
import type { SupportTicketItem, CreateTicketPayload } from './types';

export const ticketService = {
  /**
   * List all support and dispute tickets for current user
   */
  async getTickets(): Promise<SupportTicketItem[]> {
    const res = await apiClient.get<any>('/tickets');
    if (Array.isArray(res)) {
      return res;
    }
    return res?.data || res?.tickets || [];
  },

  /**
   * Create a new support ticket or dispute
   */
  async createTicket(payload: CreateTicketPayload): Promise<{ success: boolean; message: string; ticket: SupportTicketItem }> {
    return apiClient.post('/tickets', payload);
  },

  /**
   * Get single ticket by ID
   */
  async getTicketById(id: string): Promise<SupportTicketItem> {
    const res = await apiClient.get<any>(`/tickets/${id}`);
    return res?.ticket || res?.data || res;
  },
};
