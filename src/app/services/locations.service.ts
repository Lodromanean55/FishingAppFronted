// src/app/services/locations.service.ts

import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs';
import { environment } from '../../environments/environment';
import { FishingLocationResponseDTO } from '../models/fishing-location-response.dto';
import { FishingLocationRequestDTO }  from '../models/fishing-location-request.dto';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  private readonly baseUrl = `${environment.apiUrl}/locations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FishingLocationResponseDTO[]> {
    return this.http.get<FishingLocationResponseDTO[]>(this.baseUrl);
  }

  getById(id: number): Observable<FishingLocationResponseDTO> {
    return this.http.get<FishingLocationResponseDTO>(`${this.baseUrl}/${id}`);
  }

  create(payload: FishingLocationRequestDTO): Observable<FishingLocationResponseDTO> {
    return this.http.post<FishingLocationResponseDTO>(this.baseUrl, payload);
  }

  update(id: number, payload: FishingLocationRequestDTO): Observable<FishingLocationResponseDTO> {
    return this.http.put<FishingLocationResponseDTO>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Încarcă una sau mai multe fișiere (poze) pentru o locație.
   * @param id - id-ul locației
   * @param files - lista de File (din <input type="file">)
   */
  uploadImages(id: number, files: File[]): Observable<FishingLocationResponseDTO> {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return this.http.post<FishingLocationResponseDTO>(
      `${this.baseUrl}/${id}/images`,
      formData
    );
  }
}
