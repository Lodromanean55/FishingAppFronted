// src/app/models/fishing-location-response.dto.ts

import { LocalizationDTO } from './localization.dto';

export interface FishingLocationResponseDTO {
  id: number;
  name: string;
  address: string;
  description?: string;

  /** URL-urile imaginilor încărcate de utilizator */
  images?: string[];

  hasBoatFishing: boolean;
  maxPersons: number;
  rules?: string;
  pricePerPerson: number;

  localizations: LocalizationDTO[];
  facilities: string[];
  species: string[];
  numberOfStands: number;
  equipmentRental: boolean;

  createdAt: string;
  updatedAt: string | null;
}
