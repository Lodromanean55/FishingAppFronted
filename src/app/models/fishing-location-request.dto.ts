// src/app/models/fishing-location-request.dto.ts

/** Localizare față de un oraș */
export interface LocalizationDTO {
  city: string;
  distanceKm: number;
  duration: string;
}

/** Payload-ul pentru crearea / actualizarea unei locații */
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
