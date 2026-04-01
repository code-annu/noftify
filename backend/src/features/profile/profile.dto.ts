export interface ProfileCreateInput {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  companyName: string;
}

export interface ProfileUpdateInput {
  id: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
}
