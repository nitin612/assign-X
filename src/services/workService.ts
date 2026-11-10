import { apiClient } from './apiClient';
import type { Project, WorkCategory, Supervisor, Phase, Milestone } from '../types';

export interface AttachmentInput {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface AttachmentUploadResult {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface CreateWorkRequestPayload {
  outcomeDescription: string;
  category: string;
  title?: string;
  detailedDescription?: string;
  requiredFeatures?: string[];
  referenceLinks?: string[];
  attachments?: AttachmentInput[];
  preferredTech?: string;
  additionalNotes?: string;
  budgetType?: 'fixed' | 'range' | 'estimate' | string;
  budgetMin?: number;
  budgetMax?: number;
  budgetFixed?: number;
  currency?: string;
  timelineType?: 'asap' | 'deadline' | 'flexible' | string;
  deadlineDate?: string;
  deadlineText?: string;
  isDraft?: boolean;
}

export interface GuestAuthPayload {
  email: string;
  password: string;
  fullName: string;
  companyName?: string;
  phone?: string;
}

export interface QuickCreateWorkPayload {
  outcomeDescription: string;
  category?: string;
  budgetType?: string;
  budgetFixed?: number;
  budgetMin?: number;
  budgetMax?: number;
  timelineType?: string;
  deadlineDate?: string;
  guestAuth?: GuestAuthPayload;
}

export interface QuickCreateResponse {
  project: any;
  auth?: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email?: string;
      fullName?: string;
      role?: string;
    };
  };
}

export interface UpdateDraftPayload {
  title?: string;
  category?: string;
  outcomeDescription?: string;
  detailedDescription?: string;
  requiredFeatures?: string[];
  referenceLinks?: string[];
  preferredTech?: string;
  additionalNotes?: string;
  budgetMin?: number;
  budgetMax?: number;
  budgetFixed?: number;
  currency?: string;
  deadlineDate?: string;
  deadlineText?: string;
  submit?: boolean;
  isDraft?: boolean;
}

export interface PromptTemplate {
  icon: string;
  title: string;
  category: string;
  prompt: string;
  details: string;
  budget: number;
}

export interface CategoryCard {
  category: string;
  enumValue: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  supervisor: {
    id: string;
    name: string;
    role: string;
    specialization: string;
    rating: number;
    reviewsCount: number;
    avatarUrl: string | null;
    status: string;
    responseTime: string;
  } | null;
}

const CATEGORY_MAP: Record<string, WorkCategory> = {
  WEBSITE_DEVELOPMENT: 'Website Development',
  MOBILE_APP_DEVELOPMENT: 'Mobile App Development',
  UI_UX_DESIGN: 'UI/UX Design',
  VIDEO_EDITING: 'Video Editing',
  AI_AUTOMATION: 'AI & Automation',
  GRAPHIC_DESIGN: 'Graphic Design',
  DIGITAL_MARKETING: 'Digital Marketing',
  CONTENT_WRITING: 'Content Writing',
  OTHER: 'Other',
};

export const mapCategoryToFrontend = (cat?: string): WorkCategory => {
  if (!cat) return 'Website Development';
  if (CATEGORY_MAP[cat]) return CATEGORY_MAP[cat];
  return (cat as WorkCategory) || 'Website Development';
};

export const mapStatusToFrontend = (status?: string): Project['status'] => {
  if (!status) return 'Under Review';
  const s = status.toUpperCase();
  if (s === 'UNDER_REVIEW') return 'Under Review';
  if (s === 'IN_PROGRESS') return 'In Progress';
  if (s === 'AWAITING_ACTION') return 'Awaiting Action';
  if (s === 'COMPLETED') return 'Completed';
  if (s === 'CANCELLED') return 'Cancelled';
  if (s === 'DRAFT') return 'Under Review';
  return (status as Project['status']) || 'Under Review';
};

/**
 * Maps backend Project model into frontend UI Project entity
 */
export const mapBackendProjectToFrontend = (raw: any): Project => {
  if (!raw) {
    throw new Error('Project data is missing');
  }

  const supervisor: Supervisor = {
    id: raw.supervisor?.id || 'sup-1',
    name: raw.supervisor?.name || 'Arjun Mehta',
    role: raw.supervisor?.role || 'Principal Technical Lead',
    specialization:
      raw.supervisor?.specialization || 'Full-Stack Web & Performance Architecture',
    rating: typeof raw.supervisor?.rating === 'number' ? raw.supervisor.rating : 4.96,
    reviewsCount: raw.supervisor?.reviewsCount || 30,
    avatar:
      raw.supervisor?.avatarUrl ||
      raw.supervisor?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: (raw.supervisor?.status as any) || 'Available',
    responseTime: raw.supervisor?.responseTime || 'Typically replies within 20 mins',
    email: raw.supervisor?.email || 'supervisor@assignx.com',
    phone: raw.supervisor?.phone,
    bio: raw.supervisor?.bio,
  };

  const phases: Phase[] = Array.isArray(raw.phases) && raw.phases.length > 0
    ? raw.phases.map((p: any) => ({
        id: p.id,
        name: p.name,
        status: p.status === 'Active' ? 'In Progress' : (p.status || 'Upcoming'),
        tasks: Array.isArray(p.tasks)
          ? p.tasks.map((t: any, i: number) =>
              typeof t === 'string'
                ? {
                    id: `t-${p.id}-${i}`,
                    name: t,
                    status: 'Upcoming' as const,
                    expectedDate: 'Within 48h',
                    progress: 0,
                  }
                : t,
            )
          : [],
        completedDate: p.completedDate,
      }))
    : [
        {
          id: `p-${raw.id}-1`,
          name: 'Requirement Review & Scope Alignment',
          status: 'In Progress',
          tasks: [
            {
              id: `t-${raw.id}-1`,
              name: 'Initial scope analysis by supervisor',
              status: 'In Progress',
              expectedDate: 'Within 24h',
              progress: 50,
            },
          ],
        },
      ];

  const milestones: Milestone[] = Array.isArray(raw.milestones) && raw.milestones.length > 0
    ? raw.milestones.map((m: any) => ({
        id: m.id,
        name: m.name,
        description: m.description,
        amount: m.amount,
        dueDate: m.dueDate ? new Date(m.dueDate).toLocaleDateString() : 'Estimated in 5 days',
        status: (m.status as any) || 'Upcoming',
        deliverablesCount: m.deliverablesCount || 0,
        deliverableIds: [],
        approvalStatus: (m.approvalStatus as any) || 'In Review',
      }))
    : [
        {
          id: `m-${raw.id}-1`,
          name: 'Requirement Review & Technical Plan',
          description: 'Detailed specification, architecture document, and milestone sign-off.',
          amount: raw.estimatedBudget ? Math.round(raw.estimatedBudget * 0.3) : 25000,
          dueDate: 'Estimated in 5 days',
          status: 'Upcoming',
          deliverablesCount: 0,
          deliverableIds: [],
          approvalStatus: 'In Review',
        },
      ];

  const files = Array.isArray(raw.attachments)
    ? raw.attachments.map((att: any) => ({
        id: att.id,
        name: att.fileName,
        type: 'my_upload' as const,
        uploadedBy: 'You',
        uploadedDate: att.createdAt
          ? new Date(att.createdAt).toLocaleDateString()
          : 'Just now',
        size:
          typeof att.fileSize === 'number'
            ? `${(att.fileSize / (1024 * 1024)).toFixed(1)} MB`
            : String(att.fileSize || 'Attached'),
        url: att.fileUrl,
      }))
    : [];

  const activities = Array.isArray(raw.activities)
    ? raw.activities.map((a: any) => ({
        id: a.id,
        type: 'supervisor' as const,
        title: a.title,
        description: a.description,
        timestamp: a.createdAt
          ? new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'Just now',
        author: a.authorName || 'AssignX System',
        authorRole: a.authorRole,
      }))
    : [];

  return {
    id: raw.id,
    title: raw.title || 'Untitled Work Request',
    category: mapCategoryToFrontend(raw.category),
    description: raw.detailedDescription || raw.outcomeDescription || '',
    status: mapStatusToFrontend(raw.status),
    progress: raw.progress ?? 5,
    supervisor,
    currentPhase: raw.currentPhase || 'Requirement Review',
    deadline: raw.deadlineDate
      ? new Date(raw.deadlineDate).toLocaleDateString()
      : raw.deadlineText || 'Flexible Timeline',
    startDate: raw.createdAt
      ? new Date(raw.createdAt).toLocaleDateString()
      : 'Just now',
    budget: raw.estimatedBudget || raw.budgetFixed || 60000,
    paidAmount: raw.paidAmount || 0,
    currentMilestone: raw.currentMilestone || 'Requirement Review & Technical Plan',
    phases,
    milestones,
    deliverables: [],
    files,
    activities,
    lastActivity: 'Just now',
  };
};

class WorkService {
  /**
   * Get Step 1 inspiration prompt templates
   */
  async getTemplates(): Promise<PromptTemplate[]> {
    return apiClient.get<PromptTemplate[]>('/work/templates');
  }

  /**
   * Get Step 2 category cards with supervisor preview
   */
  async getCategories(): Promise<CategoryCard[]> {
    return apiClient.get<CategoryCard[]>('/work/categories');
  }

  /**
   * Upload attachment file (PDF, ZIP, PNG, etc.)
   */
  async uploadAttachment(file: File): Promise<AttachmentUploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.upload<AttachmentUploadResult>('/work/attachments/upload', formData);
  }

  /**
   * Primary 6-step Create Work Request or Save Draft
   */
  async createWorkRequest(payload: CreateWorkRequestPayload): Promise<Project> {
    const response = await apiClient.post<any>('/work/requests', payload);
    const rawProject = response?.data || response;
    return mapBackendProjectToFrontend(rawProject);
  }

  /**
   * Quick Create Work Request (Landing page modal)
   */
  async quickCreateWork(payload: QuickCreateWorkPayload): Promise<{ project: Project; auth?: any }> {
    const response = await apiClient.post<QuickCreateResponse>('/work/requests/quick', payload);
    const rawProject = response?.project || (response as any)?.data?.project || response;
    const auth = response?.auth || (response as any)?.data?.auth;

    // If guest registered and tokens returned, save them immediately
    if (auth?.accessToken) {
      apiClient.setAccessToken(auth.accessToken);
      if (auth.refreshToken) {
        apiClient.setRefreshToken(auth.refreshToken);
      }
      localStorage.setItem('assignx_logged_in', 'true');
    }

    return {
      project: mapBackendProjectToFrontend(rawProject),
      auth,
    };
  }

  /**
   * Retrieve project review details for /submitted/:id
   */
  async getWorkRequest(id: string): Promise<Project> {
    const response = await apiClient.get<any>(`/work/requests/${id}`);
    const rawProject = response?.data || response;
    return mapBackendProjectToFrontend(rawProject);
  }

  /**
   * List drafts for current user
   */
  async getDrafts(): Promise<Project[]> {
    const response = await apiClient.get<any[]>('/work/drafts');
    const drafts = Array.isArray(response) ? response : (response as any)?.data || [];
    return drafts.map(mapBackendProjectToFrontend);
  }

  /**
   * Update existing draft or submit it
   */
  async updateDraft(id: string, payload: UpdateDraftPayload): Promise<Project> {
    const response = await apiClient.put<any>(`/work/drafts/${id}`, payload);
    const rawProject = response?.data || response;
    return mapBackendProjectToFrontend(rawProject);
  }

  /**
   * Delete draft
   */
  async deleteDraft(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete<{ success: boolean; message: string }>(`/work/drafts/${id}`);
  }
}

export const workService = new WorkService();
