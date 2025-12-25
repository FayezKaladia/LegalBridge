/**
 * Defines the available legal case categories supported by the platform.
 * Used for case classification and user guidance.
 */
export type CaseCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
};

export type UrgencyLevel = 'normal' | 'urgent';

export type CaseComplexity = 'low' | 'medium' | 'high';

export type ContributorRole = 'intern' | 'paralegal' | 'lawyer';

export type CaseStatus = 
  | 'draft'
  | 'submitted'
  | 'matched'
  | 'in_progress'
  | 'escalated'
  | 'resolved';

export interface CaseData {
  id?: string;
  category: string;
  subcategory?: string;
  urgency: UrgencyLevel;
  city: string;
  state: string;
  description: string;
  timeline: string;
  documents?: string[];
  desiredOutcome: string;
  complexity: CaseComplexity;
  status: CaseStatus;
  createdAt?: Date;
}

export interface Contributor {
  id: string;
  name: string;
  role: ContributorRole;
  experienceYears: number;
  interests: string[];
  city: string;
  state: string;
  availability: 'available' | 'limited' | 'unavailable';
  canAssistWith: ('drafting' | 'guidance' | 'supervision')[];
  bio: string;
  casesHandled: number;
  rating?: number;
}

export const CASE_CATEGORIES: CaseCategory[] = [
  {
    id: 'rent',
    name: 'Rent & Housing Disputes',
    icon: '🏠',
    description: 'Landlord issues, eviction, deposit disputes',
    subcategories: ['Eviction Notice', 'Security Deposit', 'Rent Agreement', 'Maintenance Issues', 'Illegal Occupation'],
  },
  {
    id: 'employment',
    name: 'Employment & Labor',
    icon: '💼',
    description: 'Job scams, unpaid wages, wrongful termination',
    subcategories: ['Unpaid Salary', 'Wrongful Termination', 'Workplace Harassment', 'Job Scam', 'Contract Dispute'],
  },
  {
    id: 'consumer',
    name: 'Consumer Protection',
    icon: '🛒',
    description: 'Defective products, service complaints',
    subcategories: ['Defective Product', 'Service Deficiency', 'Online Fraud', 'Warranty Issues', 'Unfair Trade Practice'],
  },
  {
    id: 'family',
    name: 'Family & Matrimonial',
    icon: '👨‍👩‍👧',
    description: 'Divorce, custody, domestic issues',
    subcategories: ['Divorce Proceedings', 'Child Custody', 'Domestic Violence', 'Maintenance/Alimony', 'Property Settlement'],
  },
  {
    id: 'cyber',
    name: 'Cyber Crime',
    icon: '💻',
    description: 'Online fraud, identity theft, harassment',
    subcategories: ['Online Fraud', 'Identity Theft', 'Cyber Harassment', 'Data Privacy', 'Hacking/Phishing'],
  },
  {
    id: 'police',
    name: 'Police & FIR Matters',
    icon: '🚔',
    description: 'FIR assistance, police complaints',
    subcategories: ['File FIR', 'Police Inaction', 'False FIR', 'Station Complaint', 'Investigation Follow-up'],
  },
  {
    id: 'property',
    name: 'Property & Land',
    icon: '🏗️',
    description: 'Property disputes, land grabbing, documentation',
    subcategories: ['Property Dispute', 'Land Grabbing', 'Title Verification', 'Registration Issues', 'Encroachment'],
  },
  {
    id: 'government',
    name: 'Government Services',
    icon: '🏛️',
    description: 'RTI, government benefits, document issues',
    subcategories: ['RTI Application', 'Pension Issues', 'Document Correction', 'Scheme Benefits', 'License/Permit'],
  },
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
];
