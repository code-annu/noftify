export interface Profile {
  readonly id: string;
  readonly email: string;
  firstName: string;
  lastName: string | null;
  companyName: string;
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
}

export interface ProfileCreate {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  companyName: string;
}

export interface ProfileUpdate {
  firstName: string;
  lastName: string | null;
  companyName: string;
}
