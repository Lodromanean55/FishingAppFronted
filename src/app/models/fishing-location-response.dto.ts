import { LocalizationDTO } from './localization.dto';

export interface FishingLocationResponseDTO {
  id: number;
  name: string;
  address: string;
  description?: string;

  /** căile către fișiere */
  imagePaths?: string[];

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

  /** PENTRU UPDATE/DELETE DOAR DE CĂTRE PROPRIETAR */
  ownerId: number;           // ← ADĂUGAT
  ownerUsername: string;     // ← ADĂUGAT
}
