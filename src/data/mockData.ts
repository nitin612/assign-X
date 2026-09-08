import type {
  Project,
  Supervisor,
  Message,
  PaymentRecord,
  NotificationItem,
  SupportTicket,
} from '../types';

export const mockSupervisors: Record<string, Supervisor> = {
  arjun: {
    id: 'sup-1',
    name: 'Arjun Mehta',
    role: 'Principal Technical Lead',
    specialization: 'Full-Stack Web & Performance Architecture',
    rating: 4.96,
    reviewsCount: 42,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Available',
    responseTime: 'Typically replies within 20 mins',
    email: 'arjun.mehta@supervisors.assignx.com',
    phone: '+91 98201 44520',
    bio: '11+ years directing web engineering and SaaS platforms. Manages execution, code quality, and delivery deadlines.'
  },
  priya: {
    id: 'sup-2',
    name: 'Priya Sharma',
    role: 'Senior Mobile Engineering Lead',
    specialization: 'iOS / React Native & Security Compliance',
    rating: 4.98,
    reviewsCount: 38,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'Available',
    responseTime: 'Typically replies within 30 mins',
    email: 'priya.sharma@supervisors.assignx.com',
    phone: '+91 98450 11239',
    bio: 'Specialist in fintech systems and mobile apps with strict data confidentiality standards.'
  },
  rohan: {
    id: 'sup-3',
    name: 'Rohan Varma',
    role: 'Head of Product Design & Systems',
    specialization: 'Enterprise Design Systems & UI/UX Strategy',
    rating: 4.92,
    reviewsCount: 29,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Busy',
    responseTime: 'Typically replies within 1 hour',
    email: 'rohan.varma@supervisors.assignx.com',
    phone: '+91 99104 88301',
    bio: 'Coordinates design sprints, micro-interactions, Figma component libraries, and user research.'
  },
  ananya: {
    id: 'sup-4',
    name: 'Ananya Iyer',
    role: 'DevOps & Cloud Systems Architect',
    specialization: 'AWS Infrastructure, CI/CD & Kubernetes',
    rating: 4.95,
    reviewsCount: 24,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'Available',
    responseTime: 'Typically replies within 45 mins',
    email: 'ananya.iyer@supervisors.assignx.com',
    bio: 'Manages multi-region cloud migrations, serverless workflows, and zero-downtime deployments.'
  },
  vikram: {
    id: 'sup-5',
    name: 'Vikram Sen',
    role: 'Creative & Brand Strategist',
    specialization: 'Visual Identity, Marketing Collateral & Motion',
    rating: 4.91,
    reviewsCount: 31,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'In Meeting',
    responseTime: 'Typically replies within 2 hours',
    email: 'vikram.sen@supervisors.assignx.com',
    bio: 'Oversees visual designers and copywriters to ensure unified high-end brand execution.'
  }
};

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Restaurant Website Redesign',
    category: 'Website Development',
    description: 'Modern, high-converting digital presence for a premium dining establishment, including responsive interactive menus, table reservation flow, and private events showcase.',
    status: 'In Progress',
    progress: 68,
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    supervisor: mockSupervisors.arjun,
    currentPhase: 'Development',
    deadline: '24 September 2026',
    startDate: '10 August 2026',
    budget: 85000,
    paidAmount: 51000,
    currentMilestone: 'Frontend Development & Menu Interaction',
    nextAction: {
      title: 'Review homepage & reservation flow implementation',
      description: 'The frontend development preview link and source bundles have been submitted by Arjun.',
      type: 'review',
      milestoneId: 'm-3',
      deadline: '12 September 2026'
    },
    phases: [
      {
        id: 'p-1',
        name: 'Requirement Review & Scope Alignment',
        status: 'Completed',
        completedDate: '15 Aug 2026',
        tasks: [
          { id: 't-1', name: 'Brand assets and menu catalog ingestion', status: 'Completed', expectedDate: '12 Aug 2026', progress: 100 },
          { id: 't-2', name: 'Technical specification & third-party booking API evaluation', status: 'Completed', expectedDate: '15 Aug 2026', progress: 100 }
        ]
      },
      {
        id: 'p-2',
        name: 'UI/UX Design & Prototype',
        status: 'Completed',
        completedDate: '28 Aug 2026',
        tasks: [
          { id: 't-3', name: 'High-fidelity Figma wireframes & moodboard', status: 'Completed', expectedDate: '22 Aug 2026', progress: 100 },
          { id: 't-4', name: 'Responsive mobile layout & reservation UX validation', status: 'Completed', expectedDate: '28 Aug 2026', progress: 100 }
        ]
      },
      {
        id: 'p-3',
        name: 'Frontend Development & Integration',
        status: 'In Progress',
        tasks: [
          { id: 't-5', name: 'Component implementation (Hero, Menu, Gallery, Footer)', status: 'Completed', expectedDate: '02 Sep 2026', progress: 100 },
          { id: 't-6', name: 'Reservation engine & booking confirmation modal', status: 'In Progress', expectedDate: '10 Sep 2026', progress: 75 },
          { id: 't-7', name: 'Lighthouse speed & Core Web Vitals optimization', status: 'Upcoming', expectedDate: '14 Sep 2026', progress: 20 }
        ]
      },
      {
        id: 'p-4',
        name: 'Content & CMS Integration',
        status: 'Upcoming',
        tasks: [
          { id: 't-8', name: 'Headless CMS setup for chef specials and seasonal updates', status: 'Upcoming', expectedDate: '18 Sep 2026', progress: 0 }
        ]
      },
      {
        id: 'p-5',
        name: 'Quality Assurance & Cross-browser Testing',
        status: 'Upcoming',
        tasks: [
          { id: 't-9', name: 'Cross-device mobile testing (iOS Safari, Android Chrome)', status: 'Upcoming', expectedDate: '21 Sep 2026', progress: 0 }
        ]
      },
      {
        id: 'p-6',
        name: 'Final Delivery & DNS Launch',
        status: 'Upcoming',
        tasks: [
          { id: 't-10', name: 'Production domain cutover & SSL certificate provisioning', status: 'Upcoming', expectedDate: '24 Sep 2026', progress: 0 }
        ]
      }
    ],
    milestones: [
      {
        id: 'm-1',
        name: 'Scope Alignment & Information Architecture',
        description: 'Detailed site map, content matrix, and technical blueprint.',
        amount: 25000,
        dueDate: '16 Aug 2026',
        status: 'Paid',
        deliverablesCount: 2,
        deliverableIds: ['del-1', 'del-2'],
        approvalStatus: 'Approved'
      },
      {
        id: 'm-2',
        name: 'Complete UI/UX Design System & Prototype',
        description: 'Figma interactive component library, typography, and responsive page mockups.',
        amount: 26000,
        dueDate: '29 Aug 2026',
        status: 'Paid',
        deliverablesCount: 3,
        deliverableIds: ['del-3', 'del-4', 'del-5'],
        approvalStatus: 'Approved'
      },
      {
        id: 'm-3',
        name: 'Frontend Development & Menu Interaction',
        description: 'Functional React frontend, responsive menu filtering, and live staging deployment.',
        amount: 20000,
        dueDate: '14 Sep 2026',
        status: 'Submitted',
        deliverablesCount: 2,
        deliverableIds: ['del-6', 'del-7'],
        approvalStatus: 'Pending Client Action',
        actionRequired: {
          type: 'approve',
          label: 'Review and Approve Milestone',
          deadline: '12 Sep 2026'
        }
      },
      {
        id: 'm-4',
        name: 'CMS Integration, QA & Production Deployment',
        description: 'Final domain cutover, training documentation, and live handoff.',
        amount: 14000,
        dueDate: '24 Sep 2026',
        status: 'Upcoming',
        deliverablesCount: 0,
        deliverableIds: [],
        approvalStatus: 'Not Started'
      }
    ],
    deliverables: [
      {
        id: 'del-1',
        name: 'Information Architecture & Page Hierarchy.pdf',
        milestoneId: 'm-1',
        milestoneName: 'Scope Alignment & Information Architecture',
        fileType: 'PDF',
        fileSize: '3.4 MB',
        submittedDate: '15 Aug 2026',
        submittedBy: 'Arjun Mehta',
        status: 'Approved',
        version: 'v1.1'
      },
      {
        id: 'del-3',
        name: 'Interactive Figma Prototype - Desktop & Mobile.fig',
        milestoneId: 'm-2',
        milestoneName: 'Complete UI/UX Design System & Prototype',
        fileType: 'FIGMA',
        fileSize: '18.2 MB',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80',
        submittedDate: '27 Aug 2026',
        submittedBy: 'Arjun Mehta',
        status: 'Approved',
        version: 'v2.0'
      },
      {
        id: 'del-6',
        name: 'Staging Environment & Live Demo URL',
        milestoneId: 'm-3',
        milestoneName: 'Frontend Development & Menu Interaction',
        fileType: 'WEB PREVIEW',
        fileSize: 'Cloud Hosted',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80',
        submittedDate: '06 Sep 2026',
        submittedBy: 'Arjun Mehta',
        status: 'Pending Review',
        version: 'v1.0'
      },
      {
        id: 'del-7',
        name: 'Table Reservation Flow Screen Recording.mp4',
        milestoneId: 'm-3',
        milestoneName: 'Frontend Development & Menu Interaction',
        fileType: 'VIDEO',
        fileSize: '34.8 MB',
        submittedDate: '06 Sep 2026',
        submittedBy: 'Arjun Mehta',
        status: 'Pending Review',
        version: 'v1.0'
      }
    ],
    files: [
      {
        id: 'f-1',
        name: 'Restaurant_Brand_Assets_Master.zip',
        type: 'my_upload',
        uploadedBy: 'Alex (You)',
        uploadedDate: '10 Aug 2026',
        size: '42.1 MB'
      },
      {
        id: 'f-2',
        name: 'Seasonal_Menu_Catalog_Autumn.xlsx',
        type: 'my_upload',
        uploadedBy: 'Alex (You)',
        uploadedDate: '11 Aug 2026',
        size: '1.2 MB'
      },
      {
        id: 'f-3',
        name: 'Architectural_SiteMap_AssignX.pdf',
        type: 'supervisor_upload',
        uploadedBy: 'Arjun Mehta',
        uploadedDate: '15 Aug 2026',
        size: '3.4 MB'
      },
      {
        id: 'f-4',
        name: 'Design_System_Export_Figma.fig',
        type: 'deliverable',
        uploadedBy: 'Arjun Mehta',
        uploadedDate: '27 Aug 2026',
        size: '18.2 MB'
      }
    ],
    activities: [
      {
        id: 'act-1',
        type: 'deliverable',
        title: 'New milestone submitted for review',
        description: 'Arjun Mehta submitted deliverables for "Frontend Development & Menu Interaction".',
        timestamp: 'Yesterday at 4:30 PM',
        author: 'Arjun Mehta',
        authorRole: 'Supervisor'
      },
      {
        id: 'act-2',
        type: 'comment',
        title: 'Message sent on project thread',
        description: '"We have connected the real-time reservation dates to the backend test sandbox."',
        timestamp: 'Yesterday at 4:32 PM',
        author: 'Arjun Mehta',
        authorRole: 'Supervisor'
      },
      {
        id: 'act-3',
        type: 'payment',
        title: 'Milestone 2 payment processed',
        description: '₹26,000 paid for UI/UX Design System & Prototype.',
        timestamp: '29 Aug 2026',
        author: 'System'
      },
      {
        id: 'act-4',
        type: 'supervisor',
        title: 'Supervisor assigned to project',
        description: 'Arjun Mehta was assigned as the accountable lead for your work.',
        timestamp: '10 Aug 2026',
        author: 'AssignX Team'
      }
    ],
    lastActivity: 'Yesterday'
  },
  {
    id: 'proj-2',
    title: 'Fintech iOS App MVP',
    category: 'Mobile App Development',
    description: 'Native iOS application for personal portfolio tracking, instant bank balance syncing, and intelligent categorization of monthly expenses with biometric security.',
    status: 'Awaiting Action',
    progress: 45,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    supervisor: mockSupervisors.priya,
    currentPhase: 'Planning & Security Compliance',
    deadline: '18 October 2026',
    startDate: '18 August 2026',
    budget: 190000,
    paidAmount: 60000,
    currentMilestone: 'System Architecture & Plaid Sync Mockup',
    nextAction: {
      title: 'Approve Milestone 2: Security Architecture & User Flow',
      description: 'Priya has verified encryption compliance and awaits your approval to unlock sprint 2.',
      type: 'approve',
      milestoneId: 'm-202',
      deadline: '09 September 2026'
    },
    phases: [
      {
        id: 'p-201',
        name: 'Requirement & Compliance Architecture',
        status: 'Completed',
        completedDate: '25 Aug 2026',
        tasks: [
          { id: 't-201', name: 'Open Banking compliance & key management strategy', status: 'Completed', expectedDate: '23 Aug 2026', progress: 100 }
        ]
      },
      {
        id: 'p-202',
        name: 'UI/UX & Wireframe Prototyping',
        status: 'In Progress',
        tasks: [
          { id: 't-202', name: 'iOS Human Interface Guidelines prototype', status: 'Completed', expectedDate: '02 Sep 2026', progress: 100 },
          { id: 't-203', name: 'Biometric face unlock & session management states', status: 'In Progress', expectedDate: '08 Sep 2026', progress: 80 }
        ]
      },
      {
        id: 'p-203',
        name: 'Native Swift Client Development',
        status: 'Upcoming',
        tasks: [
          { id: 't-204', name: 'SwiftUI dashboard & interactive stock chart widgets', status: 'Upcoming', expectedDate: '25 Sep 2026', progress: 0 }
        ]
      },
      {
        id: 'p-204',
        name: 'TestFlight Private Beta & App Store Submission',
        status: 'Upcoming',
        tasks: [
          { id: 't-205', name: 'Apple App Store review compliance verification', status: 'Upcoming', expectedDate: '15 Oct 2026', progress: 0 }
        ]
      }
    ],
    milestones: [
      {
        id: 'm-201',
        name: 'Security Protocol & Wireframes Spec',
        description: 'End-to-end encryption blueprint and banking compliance sign-off.',
        amount: 60000,
        dueDate: '26 Aug 2026',
        status: 'Paid',
        deliverablesCount: 1,
        deliverableIds: ['del-201'],
        approvalStatus: 'Approved'
      },
      {
        id: 'm-202',
        name: 'System Architecture & Plaid Sync Mockup',
        description: 'Full iOS prototype showcasing banking linkage and portfolio widgets.',
        amount: 65000,
        dueDate: '08 Sep 2026',
        status: 'Submitted',
        deliverablesCount: 2,
        deliverableIds: ['del-202', 'del-203'],
        approvalStatus: 'Pending Client Action',
        actionRequired: {
          type: 'approve',
          label: 'Approve Milestone 2',
          deadline: '09 Sep 2026'
        }
      },
      {
        id: 'm-203',
        name: 'SwiftUI Implementation & TestFlight Build',
        description: 'Working iOS binary distributed through Apple TestFlight for testing.',
        amount: 65000,
        dueDate: '18 Oct 2026',
        status: 'Upcoming',
        deliverablesCount: 0,
        deliverableIds: [],
        approvalStatus: 'Not Started'
      }
    ],
    deliverables: [
      {
        id: 'del-201',
        name: 'Security_Architecture_Report.pdf',
        milestoneId: 'm-201',
        milestoneName: 'Security Protocol & Wireframes Spec',
        fileType: 'PDF',
        fileSize: '5.1 MB',
        submittedDate: '25 Aug 2026',
        submittedBy: 'Priya Sharma',
        status: 'Approved',
        version: 'v1.0'
      },
      {
        id: 'del-202',
        name: 'Fintech_App_iOS_Interactive_Prototype.fig',
        milestoneId: 'm-202',
        milestoneName: 'System Architecture & Plaid Sync Mockup',
        fileType: 'FIGMA',
        fileSize: '24.6 MB',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=80',
        submittedDate: '05 Sep 2026',
        submittedBy: 'Priya Sharma',
        status: 'Pending Review',
        version: 'v1.0'
      }
    ],
    files: [
      {
        id: 'f-201',
        name: 'Compliance_Checklist_India_RBI.pdf',
        type: 'supervisor_upload',
        uploadedBy: 'Priya Sharma',
        uploadedDate: '22 Aug 2026',
        size: '1.9 MB'
      }
    ],
    activities: [
      {
        id: 'act-201',
        type: 'deliverable',
        title: 'Milestone 2 deliverables submitted',
        description: 'Priya Sharma submitted iOS interactive prototype for your review.',
        timestamp: '2 days ago',
        author: 'Priya Sharma',
        authorRole: 'Supervisor'
      }
    ],
    lastActivity: '2 days ago'
  },
  {
    id: 'proj-3',
    title: 'B2B SaaS Design System',
    category: 'UI/UX Design',
    description: 'Comprehensive, multi-brand Figma token library, React component guidelines, and accessibility documentation for enterprise analytics dashboard.',
    status: 'Completed',
    progress: 100,
    coverImage: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80',
    supervisor: mockSupervisors.rohan,
    currentPhase: 'Delivery',
    deadline: '30 August 2026',
    startDate: '01 July 2026',
    budget: 120000,
    paidAmount: 120000,
    currentMilestone: 'Final Tokens & Storybook Audit',
    phases: [
      {
        id: 'p-301',
        name: 'Component Inventory & Token Audit',
        status: 'Completed',
        completedDate: '15 Jul 2026',
        tasks: [{ id: 't-301', name: 'Color, typography and elevation taxonomy', status: 'Completed', expectedDate: '15 Jul 2026', progress: 100 }]
      },
      {
        id: 'p-302',
        name: 'Figma Auto-Layout Master Library',
        status: 'Completed',
        completedDate: '10 Aug 2026',
        tasks: [{ id: 't-302', name: '50+ reusable components & variants', status: 'Completed', expectedDate: '10 Aug 2026', progress: 100 }]
      },
      {
        id: 'p-303',
        name: 'Developer Handoff & Documentation',
        status: 'Completed',
        completedDate: '30 Aug 2026',
        tasks: [{ id: 't-303', name: 'Figma variables & token JSON export', status: 'Completed', expectedDate: '30 Aug 2026', progress: 100 }]
      }
    ],
    milestones: [
      {
        id: 'm-301',
        name: 'Design System Foundation & Token Matrix',
        description: 'Initial token architecture and primitive components.',
        amount: 50000,
        dueDate: '16 Jul 2026',
        status: 'Paid',
        deliverablesCount: 1,
        deliverableIds: ['del-301'],
        approvalStatus: 'Approved'
      },
      {
        id: 'm-302',
        name: 'Complete Component Library & Documentation',
        description: 'All 50+ enterprise components and documentation.',
        amount: 70000,
        dueDate: '30 Aug 2026',
        status: 'Paid',
        deliverablesCount: 2,
        deliverableIds: ['del-302', 'del-303'],
        approvalStatus: 'Approved'
      }
    ],
    deliverables: [
      {
        id: 'del-301',
        name: 'AssignX_DesignSystem_v1.0.fig',
        milestoneId: 'm-302',
        milestoneName: 'Complete Component Library & Documentation',
        fileType: 'FIGMA',
        fileSize: '48.9 MB',
        thumbnailUrl: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=400&auto=format&fit=crop&q=80',
        submittedDate: '29 Aug 2026',
        submittedBy: 'Rohan Varma',
        status: 'Approved',
        version: 'v1.0'
      }
    ],
    files: [
      {
        id: 'f-301',
        name: 'design-tokens-export.json',
        type: 'deliverable',
        uploadedBy: 'Rohan Varma',
        uploadedDate: '29 Aug 2026',
        size: '142 KB'
      }
    ],
    activities: [
      {
        id: 'act-301',
        type: 'milestone',
        title: 'Project successfully completed & verified',
        description: 'All milestones signed off and final deliverables archived.',
        timestamp: '30 Aug 2026',
        author: 'Rohan Varma',
        authorRole: 'Supervisor'
      }
    ],
    lastActivity: '30 Aug 2026'
  },
  {
    id: 'proj-4',
    title: 'Cloud Migration & DevOps Setup',
    category: 'Other',
    description: 'Migrating legacy on-premise container cluster to AWS ECS Fargate, configuring Terraform infrastructure-as-code, and automated GitHub Actions CI/CD pipelines.',
    status: 'In Progress',
    progress: 25,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    supervisor: mockSupervisors.ananya,
    currentPhase: 'VPC & Security Configuration',
    deadline: '05 October 2026',
    startDate: '28 August 2026',
    budget: 75000,
    paidAmount: 25000,
    currentMilestone: 'VPC, IAM Roles & Dockerization',
    nextAction: {
      title: 'Provide AWS Staging Account Access',
      description: 'Ananya needs staging IAM role delegation to deploy initial VPC Terraform scripts.',
      type: 'info',
      deadline: '10 September 2026'
    },
    phases: [
      {
        id: 'p-401',
        name: 'Infrastructure Audit & Architecture Plan',
        status: 'Completed',
        completedDate: '02 Sep 2026',
        tasks: [{ id: 't-401', name: 'Workload benchmark and resource sizing', status: 'Completed', expectedDate: '02 Sep 2026', progress: 100 }]
      },
      {
        id: 'p-402',
        name: 'Terraform Scripts & AWS VPC Setup',
        status: 'In Progress',
        tasks: [
          { id: 't-402', name: 'Multi-AZ VPC, subnets, NAT gateways', status: 'In Progress', expectedDate: '12 Sep 2026', progress: 40 }
        ]
      }
    ],
    milestones: [
      {
        id: 'm-401',
        name: 'Infrastructure Plan & Dockerfiles',
        description: 'Architectural diagrams, cost estimation, and container optimization.',
        amount: 25000,
        dueDate: '03 Sep 2026',
        status: 'Paid',
        deliverablesCount: 1,
        deliverableIds: ['del-401'],
        approvalStatus: 'Approved'
      },
      {
        id: 'm-402',
        name: 'VPC, IAM Roles & Dockerization',
        description: 'Complete Terraform provisioning and zero-trust security configuration.',
        amount: 30000,
        dueDate: '20 Sep 2026',
        status: 'In Progress',
        deliverablesCount: 0,
        deliverableIds: [],
        approvalStatus: 'In Review'
      },
      {
        id: 'm-403',
        name: 'CI/CD Pipeline & Cutover Verification',
        description: 'Automated deployments and zero-downtime DNS switchover.',
        amount: 20000,
        dueDate: '05 Oct 2026',
        status: 'Upcoming',
        deliverablesCount: 0,
        deliverableIds: [],
        approvalStatus: 'Not Started'
      }
    ],
    deliverables: [],
    files: [],
    activities: [
      {
        id: 'act-401',
        type: 'supervisor',
        title: 'Audit report shared',
        description: 'Ananya Iyer submitted workload sizing plan.',
        timestamp: '3 days ago',
        author: 'Ananya Iyer',
        authorRole: 'Supervisor'
      }
    ],
    lastActivity: '3 days ago'
  },
  {
    id: 'proj-5',
    title: 'Brand Identity & Marketing Assets',
    category: 'Graphic Design',
    description: 'Full visual identity creation, including minimalist vector logo mark, stationery package, social media kit, and interactive brand guidelines booklet.',
    status: 'Under Review',
    progress: 85,
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    supervisor: mockSupervisors.vikram,
    currentPhase: 'Brand Collateral',
    deadline: '16 September 2026',
    startDate: '20 August 2026',
    budget: 45000,
    paidAmount: 25000,
    currentMilestone: 'Stationery & Social Media Guidelines',
    nextAction: {
      title: 'Review Brand Guidelines draft & packaging preview',
      description: 'Vikram submitted the high-res 3D mockup renders and stationery print templates.',
      type: 'review',
      deadline: '11 September 2026'
    },
    phases: [
      {
        id: 'p-501',
        name: 'Brand Discovery & Logo Concepts',
        status: 'Completed',
        completedDate: '28 Aug 2026',
        tasks: [{ id: 't-501', name: '3 divergent visual concept routes', status: 'Completed', expectedDate: '28 Aug 2026', progress: 100 }]
      },
      {
        id: 'p-502',
        name: 'Collateral & Typography Systems',
        status: 'In Progress',
        tasks: [{ id: 't-502', name: 'Business cards, letterheads, social media kits', status: 'In Progress', expectedDate: '12 Sep 2026', progress: 85 }]
      }
    ],
    milestones: [
      {
        id: 'm-501',
        name: 'Logo Marks & Typography Guide',
        description: 'Primary, secondary, and badge logo formats with vector exports.',
        amount: 25000,
        dueDate: '28 Aug 2026',
        status: 'Paid',
        deliverablesCount: 2,
        deliverableIds: ['del-501'],
        approvalStatus: 'Approved'
      },
      {
        id: 'm-502',
        name: 'Stationery & Social Media Guidelines',
        description: 'Print-ready vector assets and digital brand presentation.',
        amount: 20000,
        dueDate: '16 Sep 2026',
        status: 'Submitted',
        deliverablesCount: 1,
        deliverableIds: ['del-502'],
        approvalStatus: 'Pending Client Action'
      }
    ],
    deliverables: [
      {
        id: 'del-501',
        name: 'Master_Brand_Identity_v1.pdf',
        milestoneId: 'm-501',
        milestoneName: 'Logo Marks & Typography Guide',
        fileType: 'PDF',
        fileSize: '12.4 MB',
        thumbnailUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&auto=format&fit=crop&q=80',
        submittedDate: '27 Aug 2026',
        submittedBy: 'Vikram Sen',
        status: 'Approved',
        version: 'v1.0'
      }
    ],
    files: [],
    activities: [
      {
        id: 'act-501',
        type: 'deliverable',
        title: 'Brand collateral package submitted',
        description: 'Vikram Sen submitted print assets.',
        timestamp: '4 days ago',
        author: 'Vikram Sen',
        authorRole: 'Supervisor'
      }
    ],
    lastActivity: '4 days ago'
  }
];

export const mockMessages: Record<string, Message[]> = {
  'proj-1': [
    {
      id: 'msg-1',
      projectId: 'proj-1',
      projectTitle: 'Restaurant Website Redesign',
      sender: 'supervisor',
      senderName: 'Arjun Mehta',
      senderAvatar: mockSupervisors.arjun.avatar,
      content: 'Hello Alex! I am Arjun Mehta, your assigned Supervisor for the Restaurant Website Redesign. I have reviewed your requirement and onboarded two frontend engineers and an interaction designer to build the reservation experience.',
      timestamp: '10 Aug, 10:15 AM',
      dateGroup: '10 August 2026',
      isRead: true
    },
    {
      id: 'msg-2',
      projectId: 'proj-1',
      projectTitle: 'Restaurant Website Redesign',
      sender: 'client',
      senderName: 'Alex (You)',
      content: 'Hi Arjun! Glad to connect. Our biggest priority is ensuring the table booking experience feels super seamless on smartphones, especially during dinner hours.',
      timestamp: '10 Aug, 10:45 AM',
      dateGroup: '10 August 2026',
      isRead: true
    },
    {
      id: 'msg-3',
      projectId: 'proj-1',
      projectTitle: 'Restaurant Website Redesign',
      sender: 'supervisor',
      senderName: 'Arjun Mehta',
      senderAvatar: mockSupervisors.arjun.avatar,
      content: 'Understood. We specifically architected a one-thumb booking flow with 3-step date/time/guest selection. The interactive Figma prototype is ready in Milestone 2 for your review.',
      timestamp: '27 Aug, 3:20 PM',
      dateGroup: '27 August 2026',
      attachments: [{ name: 'Prototype_Highlights.pdf', size: '2.1 MB', type: 'PDF' }],
      isRead: true
    },
    {
      id: 'msg-4',
      projectId: 'proj-1',
      projectTitle: 'Restaurant Website Redesign',
      sender: 'client',
      senderName: 'Alex (You)',
      content: 'Approved Milestone 2! The animation between menu categories looks incredible.',
      timestamp: '29 Aug, 11:30 AM',
      dateGroup: '29 August 2026',
      isRead: true
    },
    {
      id: 'msg-5',
      projectId: 'proj-1',
      projectTitle: 'Restaurant Website Redesign',
      sender: 'supervisor',
      senderName: 'Arjun Mehta',
      senderAvatar: mockSupervisors.arjun.avatar,
      content: 'Thank you Alex! Our engineers have now finalized the live staging environment for Milestone 3 (Frontend Development & Menu Interaction). Please test the live demo link in your Milestones tab. Let me know if any adjustments are needed!',
      timestamp: 'Yesterday at 4:32 PM',
      dateGroup: 'Yesterday',
      attachments: [{ name: 'Staging_Verification_Report.pdf', size: '1.4 MB', type: 'PDF' }],
      isRead: true
    }
  ],
  'proj-2': [
    {
      id: 'msg-201',
      projectId: 'proj-2',
      projectTitle: 'Fintech iOS App MVP',
      sender: 'supervisor',
      senderName: 'Priya Sharma',
      senderAvatar: mockSupervisors.priya.avatar,
      content: 'Hello Alex! I am Priya, overseeing your iOS MVP. We have verified compliance guidelines for multi-factor authentication.',
      timestamp: '18 Aug, 2:00 PM',
      dateGroup: '18 August 2026',
      isRead: true
    },
    {
      id: 'msg-202',
      projectId: 'proj-2',
      projectTitle: 'Fintech iOS App MVP',
      sender: 'supervisor',
      senderName: 'Priya Sharma',
      senderAvatar: mockSupervisors.priya.avatar,
      content: 'I have uploaded the interactive prototype for Milestone 2. Please take a look at the portfolio breakdown widget when you get a chance.',
      timestamp: '2 days ago at 11:15 AM',
      dateGroup: '05 September 2026',
      isRead: false
    }
  ]
};

export const mockPayments: PaymentRecord[] = [
  {
    id: 'pay-1',
    invoiceNumber: 'INV-2026-0891',
    projectId: 'proj-1',
    projectTitle: 'Restaurant Website Redesign',
    milestoneName: 'Scope Alignment & Information Architecture',
    amount: 25000,
    date: '16 Aug 2026',
    method: 'Corporate Visa •••• 4242',
    status: 'Paid',
    invoiceUrl: '#'
  },
  {
    id: 'pay-2',
    invoiceNumber: 'INV-2026-0914',
    projectId: 'proj-1',
    projectTitle: 'Restaurant Website Redesign',
    milestoneName: 'Complete UI/UX Design System & Prototype',
    amount: 26000,
    date: '29 Aug 2026',
    method: 'Corporate Visa •••• 4242',
    status: 'Paid',
    invoiceUrl: '#'
  },
  {
    id: 'pay-3',
    invoiceNumber: 'INV-2026-0945',
    projectId: 'proj-2',
    projectTitle: 'Fintech iOS App MVP',
    milestoneName: 'Security Protocol & Wireframes Spec',
    amount: 60000,
    date: '26 Aug 2026',
    method: 'HDFC Direct Bank Transfer',
    status: 'Paid',
    invoiceUrl: '#'
  },
  {
    id: 'pay-4',
    invoiceNumber: 'INV-2026-0992',
    projectId: 'proj-3',
    projectTitle: 'B2B SaaS Design System',
    milestoneName: 'Complete Component Library & Documentation',
    amount: 70000,
    date: '30 Aug 2026',
    method: 'Corporate Visa •••• 4242',
    status: 'Paid',
    invoiceUrl: '#'
  },
  {
    id: 'pay-5',
    invoiceNumber: 'INV-2026-1010',
    projectId: 'proj-1',
    projectTitle: 'Restaurant Website Redesign',
    milestoneName: 'Frontend Development & Menu Interaction',
    amount: 20000,
    date: 'Due 14 Sep 2026',
    method: 'Awaiting Milestone Sign-off',
    status: 'Pending',
    invoiceUrl: '#'
  },
  {
    id: 'pay-6',
    invoiceNumber: 'INV-2026-1025',
    projectId: 'proj-2',
    projectTitle: 'Fintech iOS App MVP',
    milestoneName: 'System Architecture & Plaid Sync Mockup',
    amount: 65000,
    date: 'Due 08 Sep 2026',
    method: 'Awaiting Milestone Sign-off',
    status: 'Pending',
    invoiceUrl: '#'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'approvals',
    title: 'Milestone Review Required',
    message: 'Arjun Mehta submitted "Frontend Development & Menu Interaction" for Restaurant Website Redesign.',
    projectId: 'proj-1',
    projectTitle: 'Restaurant Website Redesign',
    timestamp: 'Yesterday at 4:30 PM',
    isRead: false,
    actionRoute: '#/work/proj-1/milestones'
  },
  {
    id: 'notif-2',
    category: 'messages',
    title: 'New message from Priya Sharma',
    message: '"I have uploaded the interactive prototype for Milestone 2..."',
    projectId: 'proj-2',
    projectTitle: 'Fintech iOS App MVP',
    timestamp: '2 days ago',
    isRead: false,
    actionRoute: '#/messages?project=proj-2'
  },
  {
    id: 'notif-3',
    category: 'payments',
    title: 'Payment Receipt Available',
    message: 'Invoice INV-2026-0992 for ₹70,000 has been paid successfully.',
    timestamp: '30 Aug 2026',
    isRead: true,
    actionRoute: '#/payments'
  },
  {
    id: 'notif-4',
    category: 'work',
    title: 'Supervisor Assigned',
    message: 'Ananya Iyer was assigned to lead your Cloud Migration & DevOps Setup project.',
    projectId: 'proj-4',
    projectTitle: 'Cloud Migration & DevOps Setup',
    timestamp: '28 Aug 2026',
    isRead: true,
    actionRoute: '#/work/proj-4'
  }
];

export const mockTickets: SupportTicket[] = [
  {
    id: 'tkt-101',
    subject: 'Request for custom invoicing VAT breakdown',
    issueType: 'Billing & Invoicing',
    status: 'Resolved',
    createdAt: '18 Aug 2026',
    lastUpdated: '19 Aug 2026',
    description: 'We require GST/VAT registration details on all future milestone PDF receipts.'
  },
  {
    id: 'tkt-102',
    subject: 'Additional staging test domain setup',
    projectId: 'proj-1',
    projectTitle: 'Restaurant Website Redesign',
    issueType: 'Technical Question',
    status: 'Open',
    createdAt: '05 Sep 2026',
    lastUpdated: '06 Sep 2026',
    description: 'Need our internal QA team to have password access to the preview environment.'
  }
];
