export interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  appointmentTime: string; // ISO date-time
  status: 'BOOKED' | 'CANCELLED' | 'COMPLETED';
}
