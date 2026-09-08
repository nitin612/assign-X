import React, { createContext, useContext, useState } from 'react';
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
  
  // Interactive Actions
  createWorkRequest: (data: NewWorkRequest) => string; // returns new requestId
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
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [payments, setPayments] = useState<PaymentRecord[]>(mockPayments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<{ type: ActiveModalType; payload?: ModalPayload }>({
    type: null
  });

  const openModal = (type: ActiveModalType, payload?: ModalPayload) => {
    setActiveModal({ type, payload });
  };

  const closeModal = () => {
    setActiveModal({ type: null });
  };

  const createWorkRequest = (data: NewWorkRequest): string => {
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
      status: 'Under Review',
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
            { id: `t-${newId}-1`, name: 'Initial scope analysis by supervisor', status: 'In Progress', expectedDate: 'Within 24h', progress: 50 }
          ]
        },
        {
          id: `p-${newId}-2`,
          name: 'Supervisor Assignment & Plan Delivery',
          status: 'Upcoming',
          tasks: [
            { id: `t-${newId}-2`, name: 'Milestone structure & milestone breakdown', status: 'Upcoming', expectedDate: 'Within 48h', progress: 0 }
          ]
        }
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
          approvalStatus: 'In Review'
        }
      ],
      deliverables: [],
      files: data.attachments.map((att, idx) => ({
        id: `f-${newId}-${idx}`,
        name: att,
        type: 'my_upload',
        uploadedBy: 'Alex (You)',
        uploadedDate: 'Just now',
        size: 'Attached'
      })),
      activities: [
        {
          id: `act-${newId}-1`,
          type: 'supervisor',
          title: 'Work request received by AssignX',
          description: 'Your requirement is currently undergoing supervisor assignment.',
          timestamp: 'Just now',
          author: 'AssignX System'
        }
      ],
      lastActivity: 'Just now'
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
          isRead: true
        }
      ]
    }));

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        category: 'work',
        title: 'Work Request Submitted',
        message: `Your request "${newProject.title}" was submitted. Supervisor assigned.`,
        projectId: newId,
        projectTitle: newProject.title,
        timestamp: 'Just now',
        isRead: false,
        actionRoute: `#/work/${newId}`
      },
      ...prev
    ]);

    return newId;
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
              description: `₹${amount.toLocaleString('en-IN')} released for "${milestone?.name}".`,
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
      method: 'Corporate Visa •••• 4242',
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

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const createTicket = (
    ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'lastUpdated' | 'status'>
  ) => {
    const newTicket: SupportTicket = {
      id: `tkt-${Date.now().toString().slice(-4)}`,
      ...ticketData,
      status: 'Open',
      createdAt: 'Today',
      lastUpdated: 'Just now'
    };

    setTickets(prev => [newTicket, ...prev]);
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
