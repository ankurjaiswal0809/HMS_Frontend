export interface PharmacySale {
  id?: number;
  medicineId: number;
  quantity: number;
  totalAmount: number;
  saleDate?: string; // ISO date-time
}
