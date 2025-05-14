// src/app/models/fishing-location-request.dto.ts

import { LocalizationDTO } from './localization.dto';

export interface FishingLocationRequestDTO {
  name: string;
  address: string;
  description?: string;
  hasBoatFishing: boolean;
  maxPersons: number;
  rules?: string;
  pricePerPerson: number;

  localizations: LocalizationDTO[];
  facilities: string[];
  species: string[];
  numberOfStands: number;
  equipmentRental: boolean;
}
