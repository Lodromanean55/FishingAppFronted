// src/app/models/reservation.model.ts
export interface ReservationRequestDTO {
  date: string;     // yyyy-MM-dd
  persons: number;
}

export interface ReservationResponseDTO {
  id: number;
  date: string;      // yyyy-MM-dd
  persons: number;
  locationId: number;
  username: string;
  createdAt: string; // ISO timestamp
}
