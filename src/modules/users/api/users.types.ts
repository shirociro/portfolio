export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  profile: any;
  updated_at: any;
}

export interface ListUsersResponse {
  rows: User[];
  total: number;
  page: number;
  limit: number;
}
