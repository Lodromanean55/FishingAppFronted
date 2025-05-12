// src/app/models/fishing-location-response.dto.ts

import { LocalizationDTO } from './fishing-location-request.dto';

/** Ce primești de la server când ceri o locație */
export interface FishingLocationResponseDTO {
  id: number;
  name: string;
  address: string;
  description?: string;
  hasBoatFishing: boolean;
  maxPersons: number;
  rules?: string;
  pricePerPerson: number;
  ownerId: number;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  localizations: LocalizationDTO[];
  facilities: string[];
  species: string[];
  numberOfStands: number;
  equipmentRental: boolean;
}
