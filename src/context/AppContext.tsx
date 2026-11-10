import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Project,
  Message,
  PaymentRecord,
  NotificationItem,
  SupportTicket,
  NewWorkRequest,
  Deliverable
} from '../types';
import {
  initialProjects,
  mockMessages,
  mockPayments,
  mockNotifications,
  mockTickets,
  mockSupervisors
} from '../data/mockData';
import {
  authService,
  userService,
  notificationService,
  ticketService,
  workService,
  type CreateWorkRequestPayload,
  type UserProfile,
  type AuthSuccessResult
} from '../services';

export type ActiveModalType =
  | 'request_changes'
  | 'approve_milestone'
  | 'pay_milestone'
  | 'deliverable_preview'
  | null;

export interface ModalPayload {
  projectId?: string;
  milestoneId?: string;
  milestoneName?: string;
  amount?: number;
  deliverable?: Deliverable;
}

interface AppContextType {
  projects: Project[];
  messages: Record<string, Message[]>;
  payments: PaymentRecord[];
  notifications: NotificationItem[];
  tickets: SupportTicket[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeModal: { type: ActiveModalType; payload?: ModalPayload };
  openModal: (type: ActiveModalType, payload?: ModalPayload) => void;
  closeModal: () => void;

  // Auth State
  isLoggedIn: boolean;
  currentUser: UserProfile | null;
  isLoadingUser: boolean;
  login: () => void;
  logout: () => void;
  loginUser: (email: string, password: string, rememberMe?: boolean) => Promise<AuthSuccessResult>;
  registerUser: (name: string, email: string, password: string) => Promise<AuthSuccessResult>;
  socialLoginUser: (provider: 'google' | 'github') => Promise<AuthSuccessResult>;
  validate2FAUser: (email: string, code: string, tempToken?: string) => Promise<AuthSuccessResult>;
  logoutUser: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;

  // Sidebar State
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;

  // Interactive Actions
  createWorkRequest: (data: NewWorkRequest, isDraft?: boolean) => Promise<string>; // returns new requestId
  approveMilestone: (projectId: string, milestoneId: string) => void;
  requestChanges: (projectId: string, milestoneId: string, feedback: string) => void;
  payMilestone: (projectId: string, milestoneId: string) => void;
  sendMessage: (projectId: string, content: string, attachments?: { name: string; size: string; type: string }[]) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'lastUpdated' | 'status'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state persisted in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('assignx_logged_in') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('assignx_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  const refreshUserProfile = async () => {
    if (!localStorage.getItem('assignx_access_token')) return;
    try {
      setIsLoadingUser(true);
      const profile = await userService.getProfile();
      if (profile) {
        setCurrentUser(profile);
        localStorage.setItem('assignx_current_user', JSON.stringify(profile));
      }
    } catch (err) {
      console.warn('Failed to fetch user profile from backend:', err);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const loginUser = async (email: string, password: string, rememberMe = true): Promise<AuthSuccessResult> => {
    const res = await authService.login({ email, password, rememberMe });
    if (res.requires2FA) {
      return res;
    }
    if (res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('assignx_current_user', JSON.stringify(res.user));
    }
    setIsLoggedIn(true);
    localStorage.setItem('assignx_logged_in', 'true');
    return res;
  };

  const registerUser = async (name: string, email: string, password: string): Promise<AuthSuccessResult> => {
    const res = await authService.register({ name, email, password });
    if (res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('assignx_current_user', JSON.stringify(res.user));
    }
    setIsLoggedIn(true);
    localStorage.setItem('assignx_logged_in', 'true');
    return res;
  };

  const socialLoginUser = async (provider: 'google' | 'github'): Promise<AuthSuccessResult> => {
    const res = await authService.socialLogin({
      provider,
      idToken: `social_token_${Date.now()}`,
    });
    if (res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('assignx_current_user', JSON.stringify(res.user));
    }
    setIsLoggedIn(true);
    localStorage.setItem('assignx_logged_in', 'true');
    return res;
  };

  const validate2FAUser = async (email: string, code: string, tempToken?: string): Promise<AuthSuccessResult> => {
    const res = await authService.validate2FA({ email, code, tempToken });
    if (res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('assignx_current_user', JSON.stringify(res.user));
    }
    setIsLoggedIn(true);
    localStorage.setItem('assignx_logged_in', 'true');
    return res;
  };

  const logoutUser = async () => {
    await authService.logout();
    setCurrentUser(null);
    localStorage.removeItem('assignx_current_user');
    setIsLoggedIn(false);
    localStorage.removeItem('assignx_logged_in');
  };

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('assignx_logged_in', 'true');
  };

  const logout = () => {
    logoutUser();
  };

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [payments, setPayments] = useState<PaymentRecord[]>(mockPayments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('assignx_sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('assignx_sidebar_collapsed', String(next));
      return next;
    });
  };

  const handleSetSidebarCollapsed = (val: boolean | ((prev: boolean) => boolean)) => {
    setSidebarCollapsed(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem('assignx_sidebar_collapsed', String(next));
      return next;
    });
  };
  const [activeModal, setActiveModal] = useState<{ type: ActiveModalType; payload?: ModalPayload }>({
    type: null
  });

  const openModal = (type: ActiveModalType, payload?: ModalPayload) => {
    setActiveModal({ type, payload });
  };

  const closeModal = () => {
    setActiveModal({ type: null });
  };

  const createWorkRequest = async (data: NewWorkRequest, isDraft = false): Promise<string> => {
    // 1. Attempt to create project on backend API
    try {
      const backendPayload: CreateWorkRequestPayload = {
        outcomeDescription: data.outcomeDescription,
        category: data.category,
        title: data.title,
        detailedDescription: data.detailedDescription,
        requiredFeatures: (data.requiredFeatures || []).filter(f => f.trim().length > 0),
        referenceLinks: (data.referenceLinks || []).filter(l => l.trim().length > 0),
        attachments: data.attachmentsData && data.attachmentsData.length > 0
          ? data.attachmentsData
          : (data.attachments || []).map(att => ({
              fileName: typeof att === 'string' ? att : (att as any).fileName,
              fileUrl: typeof att === 'string' ? `/uploads/projects/${att}` : (att as any).fileUrl,
              fileType: typeof att === 'string' ? 'application/octet-stream' : (att as any).fileType,
              fileSize: typeof att === 'string' ? 1024 * 1024 : (att as any).fileSize,
            })),
        preferredTech: data.preferredTech,
        additionalNotes: data.additionalNotes,
        budgetType: data.budgetType,
        budgetMin: data.budgetMin,
        budgetMax: data.budgetMax,
        budgetFixed: data.budgetFixed,
        currency: data.currency,
        timelineType: data.timelineType,
        deadlineDate: data.deadlineDate,
        isDraft,
      };

      const backendProject = await workService.createWorkRequest(backendPayload);

      setProjects(prev => [backendProject, ...prev]);

      // Add initial message thread
      setMessages(prev => ({
        ...prev,
        [backendProject.id]: [
          {
            id: `msg-${Date.now()}`,
            projectId: backendProject.id,
            projectTitle: backendProject.title,
            sender: 'supervisor',
            senderName: backendProject.supervisor.name,
            senderAvatar: backendProject.supervisor.avatar,
            content: `Hello! I am ${backendProject.supervisor.name}, and AssignX has assigned me to lead your "${backendProject.title}" work request. I am reviewing the details right now and will formulate your project plan.`,
            timestamp: 'Just now',
            dateGroup: 'Today',
            isRead: true,
          },
        ],
        // Also map by projectCode if available
        ...(backendProject.projectCode
          ? {
              [backendProject.projectCode]: [
                {
                  id: `msg-code-${Date.now()}`,
                  projectId: backendProject.projectCode,
                  projectTitle: backendProject.title,
                  sender: 'supervisor',
                  senderName: backendProject.supervisor.name,
                  senderAvatar: backendProject.supervisor.avatar,
                  content: `Hello! I am ${backendProject.supervisor.name}, and AssignX has assigned me to lead your "${backendProject.title}" work request. I am reviewing the details right now and will formulate your project plan.`,
                  timestamp: 'Just now',
                  dateGroup: 'Today',
                  isRead: true,
                },
              ],
            }
          : {}),
      }));

      // Add notification
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          category: 'work',
          title: isDraft ? 'Draft Saved' : 'Work Request Submitted',
          message: isDraft
            ? `Your draft for "${backendProject.title}" has been saved.`
            : `Your request "${backendProject.title}" was submitted. Supervisor assigned.`,
          projectId: backendProject.id,
          projectTitle: backendProject.title,
          timestamp: 'Just now',
          isRead: false,
          actionRoute: `#/work/${backendProject.id}`,
        },
        ...prev,
      ]);

      return backendProject.id;
    } catch (apiError) {
      console.warn('Backend API submission unavailable or returned an error, falling back to local state:', apiError);

      const newId = `proj-${Date.now().toString().slice(-4)}`;

      // Pick appropriate supervisor based on category
      let assignedSupervisor = mockSupervisors.arjun;
      if (data.category === 'Mobile App Development') assignedSupervisor = mockSupervisors.priya;
      else if (data.category === 'UI/UX Design') assignedSupervisor = mockSupervisors.rohan;
      else if (data.category === 'Graphic Design') assignedSupervisor = mockSupervisors.vikram;
      else if (data.category === 'Other') assignedSupervisor = mockSupervisors.ananya;

      const estimatedBudget =
        data.budgetType === 'fixed'
          ? (data.budgetFixed || 60000)
          : data.budgetType === 'range'
            ? Math.round(((data.budgetMin || 40000) + (data.budgetMax || 80000)) / 2)
            : 75000;

      const newProject: Project = {
        id: newId,
        title: data.title || 'Untitled Work Request',
        category: data.category,
        description: data.detailedDescription || data.outcomeDescription,
        status: isDraft ? 'Under Review' : 'Under Review',
        progress: 5,
        supervisor: assignedSupervisor,
        currentPhase: 'Requirement Review',
        deadline: data.deadlineDate || 'Flexible Timeline',
        startDate: 'Just now',
        budget: estimatedBudget,
        paidAmount: 0,
        currentMilestone: 'Requirement Review & Technical Plan',
        phases: [
          {
            id: `p-${newId}-1`,
            name: 'Requirement Review & Scope Alignment',
            status: 'In Progress',
            tasks: [
              { id: `t-${newId}-1`, name: 'Initial scope analysis by supervisor', status: 'In Progress', expectedDate: 'Within 24h', progress: 50 },
            ],
          },
          {
            id: `p-${newId}-2`,
            name: 'Supervisor Assignment & Plan Delivery',
            status: 'Upcoming',
            tasks: [
              { id: `t-${newId}-2`, name: 'Milestone structure & milestone breakdown', status: 'Upcoming', expectedDate: 'Within 48h', progress: 0 },
            ],
          },
        ],
        milestones: [
          {
            id: `m-${newId}-1`,
            name: 'Requirement Review & Technical Plan',
            description: 'Detailed specification, architecture document, and milestone sign-off.',
            amount: Math.round(estimatedBudget * 0.3),
            dueDate: 'Estimated in 5 days',
            status: 'Upcoming',
            deliverablesCount: 0,
            deliverableIds: [],
            approvalStatus: 'In Review',
          },
        ],
        deliverables: [],
        files: (data.attachments || []).map((att, idx) => ({
          id: `f-${newId}-${idx}`,
          name: att,
          type: 'my_upload',
          uploadedBy: 'Alex (You)',
          uploadedDate: 'Just now',
          size: 'Attached',
        })),
        activities: [
          {
            id: `act-${newId}-1`,
            type: 'supervisor',
            title: isDraft ? 'Work Draft Saved' : 'Work request received by AssignX',
            description: 'Your requirement is currently undergoing supervisor assignment.',
            timestamp: 'Just now',
            author: 'AssignX System',
          },
        ],
        lastActivity: 'Just now',
      };

      setProjects(prev => [newProject, ...prev]);

      // Add initial message thread
      setMessages(prev => ({
        ...prev,
        [newId]: [
          {
            id: `msg-${Date.now()}`,
            projectId: newId,
            projectTitle: newProject.title,
            sender: 'supervisor',
            senderName: assignedSupervisor.name,
            senderAvatar: assignedSupervisor.avatar,
            content: `Hello Alex! I am ${assignedSupervisor.name}, and AssignX has assigned me to lead your "${newProject.title}" work request. I am reviewing the details right now and will prepare the full project plan.`,
            timestamp: 'Just now',
            dateGroup: 'Today',
            isRead: true,
          },
        ],
      }));

      // Add notification
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          category: 'work',
          title: isDraft ? 'Draft Saved' : 'Work Request Submitted',
          message: `Your request "${newProject.title}" was submitted. Supervisor assigned.`,
          projectId: newId,
          projectTitle: newProject.title,
          timestamp: 'Just now',
          isRead: false,
          actionRoute: `#/work/${newId}`,
        },
        ...prev,
      ]);

      return newId;
    }
  };

  const approveMilestone = (projectId: string, milestoneId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;

        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'Approved' as const,
              approvalStatus: 'Approved' as const,
              actionRequired: undefined
            };
          }
          return m;
        });

        // Update progress
        const completedCount = updatedMilestones.filter(m => m.status === 'Approved' || m.status === 'Paid').length;
        const newProgress = Math.min(100, Math.round((completedCount / updatedMilestones.length) * 100));

        return {
          ...p,
          milestones: updatedMilestones,
          progress: newProgress,
          nextAction: undefined,
          status: newProgress === 100 ? ('Completed' as const) : ('In Progress' as const),
          activities: [
            {
              id: `act-${Date.now()}`,
              type: 'milestone',
              title: 'Milestone approved by client',
              description: `You approved "${p.milestones.find(m => m.id === milestoneId)?.name}".`,
              timestamp: 'Just now',
              author: 'Alex (You)'
            },
            ...p.activities
          ]
        };
      })
    );
  };

  const requestChanges = (projectId: string, milestoneId: string, feedback: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;

        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'Changes Requested' as const,
              approvalStatus: 'Changes Requested' as const
            };
          }
          return m;
        });

        return {
          ...p,
          milestones: updatedMilestones,
          activities: [
            {
              id: `act-${Date.now()}`,
              type: 'comment',
              title: 'Changes requested on milestone',
              description: `Feedback sent to ${p.supervisor.name}: "${feedback.slice(0, 80)}..."`,
              timestamp: 'Just now',
              author: 'Alex (You)'
            },
            ...p.activities
          ]
        };
      })
    );

    // Send as message in thread
    sendMessage(projectId, `[Change Request on Milestone]: ${feedback}`);
  };

  const payMilestone = (projectId: string, milestoneId: string) => {
    const project = projects.find(p => p.id === projectId);
    const milestone = project?.milestones.find(m => m.id === milestoneId);
    const amount = milestone?.amount || 25000;

    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;

        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'Paid' as const,
              approvalStatus: 'Approved' as const,
              actionRequired: undefined
            };
          }
          return m;
        });

        return {
          ...p,
          milestones: updatedMilestones,
          paidAmount: p.paidAmount + amount,
          activities: [
            {
              id: `act-${Date.now()}`,
              type: 'payment',
              title: 'Milestone payment released',
              description: `â‚¹${amount.toLocaleString('en-IN')} released for "${milestone?.name}".`,
              timestamp: 'Just now',
              author: 'Alex (You)'
            },
            ...p.activities
          ]
        };
      })
    );

    // Add invoice record
    const newInvoice: PaymentRecord = {
      id: `pay-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      projectId,
      projectTitle: project?.title || 'AssignX Project',
      milestoneName: milestone?.name || 'Milestone Delivery',
      amount,
      date: 'Today',
      method: 'Corporate Visa â€¢â€¢â€¢â€¢ 4242',
      status: 'Paid',
      invoiceUrl: '#'
    };

    setPayments(prev => [newInvoice, ...prev]);
  };

  const sendMessage = (
    projectId: string,
    content: string,
    attachments?: { name: string; size: string; type: string }[]
  ) => {
    const project = projects.find(p => p.id === projectId);
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      projectId,
      projectTitle: project?.title || 'Project',
      sender: 'client',
      senderName: 'Alex (You)',
      content,
      timestamp: 'Just now',
      dateGroup: 'Today',
      attachments,
      isRead: true
    };

    setMessages(prev => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), newMsg]
    }));
  };

  // Load user profile, notifications, and tickets when logged in
  useEffect(() => {
    if (isLoggedIn) {
      refreshUserProfile();

      // Load backend notifications
      notificationService.getNotifications().then(res => {
        if (res?.notifications && res.notifications.length > 0) {
          setNotifications(res.notifications.map((n: any) => ({
            id: n.id,
            category: (n.category || 'system') as any,
            title: n.title,
            message: n.message,
            projectId: n.projectId,
            projectTitle: n.projectTitle,
            timestamp: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recent',
            isRead: Boolean(n.isRead),
            actionRoute: n.actionRoute,
          })));
        }
      }).catch(() => {
        // Fallback to local mock notifications if offline
      });

      // Load backend tickets
      ticketService.getTickets().then(backendTickets => {
        if (backendTickets && backendTickets.length > 0) {
          setTickets(backendTickets.map((t: any) => ({
            id: t.id,
            subject: t.subject,
            projectId: t.projectId,
            projectTitle: t.projectTitle,
            issueType: t.issueType,
            status: (t.status || 'Open') as any,
            lastUpdated: t.updatedAt ? new Date(t.updatedAt).toLocaleDateString() : 'Recent',
            createdAt: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'Recent',
            description: t.description,
          })));
        }
      }).catch(() => {
        // Fallback to local mock tickets if offline
      });
    }
  }, [isLoggedIn]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
    notificationService.markAsRead(id).catch(() => {});
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    notificationService.markAllAsRead().catch(() => {});
  };

  const createTicket = (
    ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'lastUpdated' | 'status'>
  ) => {
    const tempId = `tkt-${Date.now().toString().slice(-4)}`;
    const newTicket: SupportTicket = {
      id: tempId,
      ...ticketData,
      status: 'Open',
      createdAt: 'Today',
      lastUpdated: 'Just now'
    };

    setTickets(prev => [newTicket, ...prev]);

    // Persist to backend
    ticketService.createTicket({
      projectId: ticketData.projectId,
      projectTitle: ticketData.projectTitle,
      issueType: ticketData.issueType,
      subject: ticketData.subject,
      description: ticketData.description,
    }).then(res => {
      if (res?.ticket?.id) {
        setTickets(prev => prev.map(t => (t.id === tempId ? { ...t, id: res.ticket.id } : t)));
      }
    }).catch(err => {
      console.warn('Failed to save ticket to backend:', err);
    });
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        messages,
        payments,
        notifications,
        tickets,
        searchQuery,
        setSearchQuery,
        mobileMenuOpen,
        setMobileMenuOpen,
        activeModal,
        openModal,
        closeModal,
        isLoggedIn,
        currentUser,
        isLoadingUser,
        login,
        logout,
        loginUser,
        registerUser,
        socialLoginUser,
        validate2FAUser,
        logoutUser,
        refreshUserProfile,
        sidebarCollapsed,
        setSidebarCollapsed: handleSetSidebarCollapsed,
        toggleSidebar,
        createWorkRequest,
        approveMilestone,
        requestChanges,
        payMilestone,
        sendMessage,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        createTicket
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
