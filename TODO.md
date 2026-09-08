# AssignX — Client Panel Implementation Tracker & Roadmap

> **Product Vision**: AssignX is a managed work marketplace where clients post work they need completed, and AssignX assigns a specialized Supervisor who takes full responsibility for managing workers and delivering quality outcomes. The client never manages individual freelancers or coordinates technical teams.

---

## 📋 Master Task Checklist

### Phase 1: Foundation & Design System
- [x] **Dependencies & Setup**
  - [x] Install `lucide-react` for modern outline icons.
  - [x] Configure Vite & TypeScript path aliases.
- [x] **Design Tokens (`src/styles/tokens.css`)**
  - [x] Base neutral color palette (canvas `#F8F9FA`, surfaces `#FFFFFF`, borders `#E2E8F0`, muted `#F1F5F9`).
  - [x] Brand accent system (refined Indigo/Blue `#2563EB`, dark `#0F172A`).
  - [x] Semantic status tints (Success green, Warning amber, Error red, Info blue, Neutral gray).
  - [x] Typography scale (28-32px page title, 18-20px section heading, 15-17px card title, 14-16px body, 12-14px metadata).
  - [x] 4px/8px spacing grid variables.
  - [x] Border radius tokens (8-10px inputs/buttons, 12-16px cards, 16px modals, 9999px pills).
  - [x] Subtle elevation tokens (borders over heavy shadows).
- [x] **Base & Layout Styles (`src/styles/base.css`, `src/styles/layout.css`, `src/styles/components.css`)**
  - [x] CSS reset, antialiasing, custom slim scrollbar.
  - [x] AppShell responsive layout (240px desktop sidebar, sticky topbar, max-width content container).
  - [x] Mobile responsive layout (drawer, bottom navigation, comfortable touch targets).
  - [x] Button variants (Primary, Secondary, Ghost, Danger).
  - [x] Form input states, status badge pills, progress bars, tables, and modal overlays.

---

### Phase 2: Data Models & Realistic Dummy Dataset
- [x] **TypeScript Interfaces (`src/types/index.ts`)**
  - [x] `Project`, `WorkCategory`, `ProjectStatus`
  - [x] `Supervisor` (avatar, name, title, rating, availability, response time)
  - [x] `Milestone`, `MilestoneStatus`, `Deliverable`, `Phase`, `Task`
  - [x] `Message`, `Payment`, `Notification`, `SupportTicket`
- [x] **Rich Mock Data (`src/data/mockData.ts`)**
  - [x] Project 1: **Restaurant Website Redesign** (In Progress, 68%, Development phase, Supervisor: Arjun Mehta, Next action: Review homepage implementation, ₹85,000)
  - [x] Project 2: **Fintech iOS App MVP** (Awaiting Action, 45%, Planning phase, Supervisor: Priya Sharma, Next action: Approve Milestone 2, ₹1,90,000)
  - [x] Project 3: **B2B SaaS Design System** (Completed, 100%, Supervisor: Rohan Varma, ₹1,20,000)
  - [x] Project 4: **Cloud Migration & DevOps Setup** (In Progress, 25%, Supervisor: Ananya Iyer, Action: Provide AWS Credentials, ₹75,000)
  - [x] Project 5: **Brand Identity & Marketing Assets** (Under Review, 85%, Supervisor: Vikram Sen, ₹45,000)
  - [x] Project 6: **SEO & Content Strategy Campaign** (Upcoming, 10%, ₹35,000)
  - [x] 4+ specialized Supervisor profiles with avatars and verified stats.
  - [x] Milestone breakdowns, deliverables with preview assets, message histories, invoices, and activity logs.

---

### Phase 3: Application State & Navigation Routing
- [x] **Context & State Management (`src/context/`)**
  - [x] `AppContext.tsx`: Projects list, active project, notifications, search query, modal controllers, action triggers (approve, request changes, pay).
  - [x] `NavigationContext.tsx`: Client-side hash routing supporting deep links (`#/dashboard`, `#/work`, `#/work/:id`, `#/work/:id/:tab`, `#/create`, `#/messages`, `#/payments`, `#/notifications`, `#/settings`, `#/support`).

---

### Phase 4: Core Shell & Common Components
- [x] **Layout Components (`src/components/layout/`)**
  - [x] `AppSidebar.tsx`: Minimal white sidebar with AssignX mark, navigation items with badge counts, primary "Create New Work" action, bottom profile & support.
  - [x] `Topbar.tsx`: Breadcrumb/context title, search trigger, notifications trigger, quick help, client avatar.
  - [x] `MobileNavigation.tsx`: Mobile header, responsive navigation drawer, and bottom navigation bar.
- [x] **Common Reusable Components (`src/components/common/`)**
  - [x] `StatusBadge.tsx`: Semantic tint badges for projects, milestones, payments.
  - [x] `ProgressBar.tsx`: Sleek minimal progress bar with percentage indicator.
  - [x] `MetricCard.tsx`: Minimal metric card with muted label, prominent number, supporting info.
  - [x] `EmptyState.tsx`: Reassuring empty states with descriptive CTA.
  - [x] `SkeletonLoader.tsx`: Matching layout skeletons for cards, rows, tables.
  - [x] `PageHeader.tsx`: Uniform page titles, subtitles, and primary action bar.
  - [x] `FormField.tsx` & `FileUploader.tsx`: Accessible inputs with labels above fields.
  - [x] `SupervisorCard.tsx`: Personal yet professional supervisor card featuring avatar, name, specialization, rating, availability status, "Message Supervisor" action.
  - [x] `ActionRequiredCard.tsx`: Visually distinct actionable highlight rows.

---

### Phase 5: The Three Core Anchor Experiences
- [x] **1. Client Dashboard (`src/pages/DashboardPage.tsx`)**
  - [x] Greeting: *"Good morning, Alex"* + *"Here’s what’s happening with your work."*
  - [x] Action buttons: Primary *"Create New Work"*, secondary *"View All Work"*.
  - [x] Summary Metrics: Active Work, Awaiting Your Action, Completed, Total Spent.
  - [x] **Action Required** Section: High-priority cards (e.g. Approve Milestone, Review Quotation, Provide Info) with instant CTAs.
  - [x] **Active Work** Section: Horizontal compact project cards with progress bar, supervisor avatar, current milestone, deadline, and "View Project".
  - [x] **Recent Activity** Section: Lightweight audit timeline.
- [x] **2. Create New Work Flow (`src/pages/create-work/`)**
  - [x] Conversational centered column (750px max width) with thin progress bar (`Step X of 6`).
  - [x] `Step 1 — What do you need?`: Large outcome-focused textarea + "Help me describe this" visual prompt.
  - [x] `Step 2 — Category`: Selectable category cards (Website Dev, Mobile App, UI/UX, Graphic Design, Digital Marketing, Content, Other).
  - [x] `Step 3 — Details`: Progressive disclosure for project title, detailed description, required features, reference links, attachments, preferred tech.
  - [x] `Step 4 — Budget`: Radio choices (Fixed budget, Budget range with min/max, or *"I need AssignX to estimate it"*).
  - [x] `Step 5 — Timeline`: As soon as possible, Specific deadline (date picker), Flexible.
  - [x] `Step 6 — Review`: Formatted summary review cards with per-section "Edit" actions, "Submit Work Request", and "Save as Draft".
  - [x] `RequestSubmittedPage.tsx`: Reassuring confirmation (*"Your request is with us."*), Request ID, 4-step "What happens next" journey, "View Work" & "Back to Dashboard" buttons.
- [x] **3. Project Detail Workspace (`src/pages/project-detail/`)**
  - [x] Project Header: Title, category, ID, status badge, progress bar, deadline, budget, supervisor chip, contextual primary action button.
  - [x] **Tab 1: Overview**: 2-column layout (Left: Progress, Current Phase, Next Milestone, Action Required, Updates; Right: Supervisor Card with "Message Supervisor", Project Specs, Quick Actions).
  - [x] **Tab 2: Progress**: Modern vertical timeline with 6 phases (Requirement Review, Planning, Design, Development, Testing, Delivery) and expandable task lists.
  - [x] **Tab 3: Milestones**: Milestone cards with description, amount, due date, deliverables, approval status, and action buttons ("Approve", "Request Changes", "Pay Now").
  - [x] **Tab 4: Deliverables**: Deliverables table & gallery with thumbnail preview, milestone tag, submission date, status, preview, download, and review actions.
  - [x] **Tab 5: Messages**: Dedicated client ↔ supervisor conversation tab with rich chat, attachments, and project context.
  - [x] **Tab 6: Files**: Categorized table (All Files, My Uploads, Supervisor Uploads, Deliverables, Documents) with type icons, size, and download actions.
  - [x] **Tab 7: Payments**: Project financial overview (Total, Paid, Pending, Remaining) + milestone payment history table with Pay Now, View Invoice, and Receipt Download.
  - [x] **Tab 8: Activity**: Complete audit trail of project milestones, submissions, approvals, and messages.

---

### Phase 6: All Remaining Pages & Modals
- [x] **My Work Page (`src/pages/MyWorkPage.tsx`)**
  - [x] Header + "Create New Work" CTA.
  - [x] Tabs: All, Active, Awaiting Action, Completed, Cancelled.
  - [x] Search & Filters (Category, Status, Date, Supervisor).
  - [x] Desktop table/list hybrid + Mobile compact cards.
- [x] **Central Messages Page (`src/pages/CentralMessagesPage.tsx`)**
  - [x] Two-panel conversation layout (Left: Project/Supervisor conversation list; Right: Active chat thread with supervisor profile header, date grouping, attachment sending).
- [x] **Central Payments Page (`src/pages/CentralPaymentsPage.tsx`)**
  - [x] Financial metrics (Total Spent, Upcoming, Pending, Refunded).
  - [x] Payment history table with status chips, invoice preview, and receipt download.
- [x] **Notifications Page (`src/pages/NotificationsPage.tsx`)**
  - [x] Categories: All, Work Updates, Messages, Payments, Approvals, System.
  - [x] Lightweight notification list with read/unread markers and project context.
- [x] **Profile & Settings Page (`src/pages/ProfileSettingsPage.tsx`)**
  - [x] Tabs: Personal Information, Company Information, Security, Billing, Payment Methods, Notification Preferences.
- [x] **Support & Disputes Page (`src/pages/SupportDisputesPage.tsx`)**
  - [x] Search help, contact support, tickets, and calm, neutral "Report Project Issue" dispute form.
- [x] **Interactive Modals (`src/components/modals/`)**
  - [x] `RequestChangesModal.tsx`: Feedback textarea, attachments uploader, guidance copy.
  - [x] `ApproveMilestoneModal.tsx`: Sign-off confirmation.
  - [x] `PayMilestoneModal.tsx`: Payment methods & escrow summary.
  - [x] `DeliverablePreviewModal.tsx`: Image/document viewer modal.

---

### Phase 7: Polish, Responsiveness & Accessibility
- [x] Test across desktop (1440px / 1280px), tablet (768px), and mobile (375-430px).
- [x] Verify keyboard accessibility, visible focus rings, and proper ARIA labels.
- [x] Run `npm run build` and `npm run lint` — 100% clean passes without warnings or errors.
