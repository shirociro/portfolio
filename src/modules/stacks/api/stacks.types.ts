export interface Stack {
  id?: number;
  name: string;
  updated_at: any;
}

export interface ListStacksResponse {
  rows: Stack[];
  total: number;
  page: number;
  limit: number;
}
