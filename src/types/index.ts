/* AssignX Client Panel Types */

export type WorkCategory =
  | 'Website Development'
  | 'Mobile App Development'
  | 'UI/UX Design'
  | 'Graphic Design'
  | 'Digital Marketing'
  | 'Content Writing'
  | 'Other';

export type ProjectStatus =
  | 'In Progress'
  | 'Awaiting Action'
  | 'Completed'
  | 'Under Review'
  | 'Upcoming'
  | 'Cancelled';

export type MilestoneStatus =
  | 'Upcoming'
  | 'In Progress'
  | 'Submitted'
  | 'Changes Requested'
  | 'Approved'
  | 'Paid';

export type PaymentStatus =
  | 'Paid'
  | 'Pending'
  | 'Upcoming'
  | 'Refunded';

export interface Supervisor {
  id: string;
  name: string;
  role: string;
  specialization: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  status: 'Available' | 'In Meeting' | 'Busy';
  responseTime: string;
  email: string;
  phone?: string;
  bio?: string;
}

export interface Task {
  id: string;
  name: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  expectedDate: string;
  progress: number;
}

export interface Phase {
  id: string;
  name: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  tasks: Task[];
  completedDate?: string;
}

export interface Deliverable {
  id: string;
  name: string;
  milestoneId: string;
  milestoneName: string;
  fileType: string;
  fileSize: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  submittedDate: string;
  submittedBy: string;
  status: 'Pending Review' | 'Approved' | 'Changes Requested';
  version: string;
  feedback?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  amount: number;
  dueDate: string;
  status: MilestoneStatus;
  deliverablesCount: number;
  deliverableIds: string[];
  approvalStatus: 'Pending Client Action' | 'Approved' | 'In Review' | 'Changes Requested' | 'Not Started';
  actionRequired?: {
    type: 'approve' | 'review' | 'pay' | 'feedback';
    label: string;
    deadline?: string;
  };
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'deliverable' | 'my_upload' | 'supervisor_upload' | 'document';
  uploadedBy: string;
  uploadedDate: string;
  size: string;
  url?: string;
}

export interface ProjectAction {
  title: string;
  description: string;
  type: 'approve' | 'review' | 'pay' | 'info';
  milestoneId?: string;
  deadline?: string;
}

export interface ProjectActivity {
  id: string;
  type: 'milestone' | 'supervisor' | 'deliverable' | 'payment' | 'comment';
  title: string;
  description: string;
  timestamp: string;
  author: string;
  authorRole?: string;
}

export interface Project {
  id: string;
  title: string;
  category: WorkCategory;
  description: string;
  status: ProjectStatus;
  progress: number;
  supervisor: Supervisor;
  currentPhase: string;
  deadline: string;
  startDate: string;
  budget: number;
  paidAmount: number;
  currentMilestone: string;
  nextAction?: ProjectAction;
  milestones: Milestone[];
  phases: Phase[];
  deliverables: Deliverable[];
  files: ProjectFile[];
  activities: ProjectActivity[];
  coverImage?: string;
  lastActivity: string;
}

export interface Message {
  id: string;
  projectId: string;
  projectTitle: string;
  sender: 'client' | 'supervisor';
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  dateGroup: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
  isRead: boolean;
}

export interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  projectId: string;
  projectTitle: string;
  milestoneName: string;
  amount: number;
  date: string;
  method: string;
  status: PaymentStatus;
  invoiceUrl?: string;
}

export interface NotificationItem {
  id: string;
  category: 'all' | 'work' | 'messages' | 'payments' | 'approvals' | 'system';
  title: string;
  message: string;
  projectId?: string;
  projectTitle?: string;
  timestamp: string;
  isRead: boolean;
  actionRoute?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  projectId?: string;
  projectTitle?: string;
  issueType: string;
  status: 'Open' | 'Under Investigation' | 'Resolved';
  lastUpdated: string;
  createdAt: string;
  description: string;
}

export interface NewWorkRequest {
  outcomeDescription: string;
  category: WorkCategory;
  title: string;
  detailedDescription: string;
  requiredFeatures: string[];
  referenceLinks: string[];
  attachments: string[];
  preferredTech?: string;
  additionalNotes?: string;
  budgetType: 'fixed' | 'range' | 'estimate';
  budgetMin?: number;
  budgetMax?: number;
  budgetFixed?: number;
  currency: string;
  timelineType: 'asap' | 'deadline' | 'flexible';
  deadlineDate?: string;
}
