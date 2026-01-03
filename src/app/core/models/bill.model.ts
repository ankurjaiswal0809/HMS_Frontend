export interface Bill {
  id?: number;
  patientId: number;
  amount: number;
  description?: string;
  billDate?: string; // ISO date-time
}
