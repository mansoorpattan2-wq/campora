export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMIN';

export type ResourceStatus = 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE' | 'IN_USE';

export type BookingStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type IssueStatus = 'OPEN' | 'IN_REPAIR' | 'SCHEDULED' | 'RESOLVED';

export type OpportunityType = 'HACKATHON' | 'INTERNSHIP' | 'COMPETITION' | 'WORKSHOP' | 'SCHOLARSHIP' | 'RESEARCH';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  rollNumber?: string;
  department: string;
  title?: string;
}

export interface ResourceFeature {
  id: string;
  feature: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'Lab' | 'Room' | 'Equipment' | 'Facility' | 'Bundle';
  building: string;
  floor: string;
  capacity: number;
  status: ResourceStatus;
  department: string;
  imageUrl: string;
  features: string[];
  requiredDependencies?: string[]; // e.g. ["Projector #04", "Arduino Kits"]
  isShared?: boolean;
  sharedWith?: string[];
  operatingHours?: string;
  description?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  location: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  purpose: 'Class' | 'Project' | 'Research' | 'Hackathon' | 'Other';
  status: BookingStatus;
  requestedAt: string;
  additionalItems?: string[];
  qrCodeUrl?: string;
  checkedInAt?: string;
  rejectionReason?: string;
  approvalStep?: 'Faculty' | 'Admin' | 'Approved';
}

export interface MaintenanceIssue {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  reportedBy: string;
  issueDescription: string;
  priority: Priority;
  status: IssueStatus;
  reportedDate: string;
  scheduledDate?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  resource: string;
  status: string;
  details?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  deadline: string;
  tags: string[];
  location?: string;
  description: string;
  stipendOrPrize?: string;
  saved?: boolean;
  applied?: boolean;
}

export interface StudentProject {
  id: string;
  title: string;
  description: string;
  progress: number;
  mentor: string;
  teamMembers: string[];
  requiredResources: string[];
  bookedResourceIds: string[];
  milestones: { title: string; completed: boolean }[];
  status: 'In Progress' | 'Planning' | 'Completed';
}

export interface StudentProgress {
  overallReadiness: number;
  dsaScore: number;
  aptitudeScore: number;
  csFundamentalsScore: number;
  projectsScore: number;
  communicationScore: number;
}
