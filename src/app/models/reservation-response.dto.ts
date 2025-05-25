// src/app/models/reservation-response.dto.ts
export interface ReservationResponseDTO {
  id:            number;
  date:          string;
  persons:       number;
  locationId:    number;       // rămâne pentru link
  locationName:  string;       // nou, populate din backend
  username:      string;
  createdAt:     string;
}
