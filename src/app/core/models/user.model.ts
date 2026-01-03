export interface User {
  id?: number;
  username: string;
  role: 'ADMIN' | 'DOCTOR' | 'STAFF' | 'PHARMACIST' | 'USER';
  enabled: boolean;
}
