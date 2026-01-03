export interface Discharge {
  id?: number;
  patientId: number;
  diagnosis: string;
  treatmentSummary: string;
  dischargeDate?: string; // ISO date-time
}
