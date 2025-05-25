import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs';
import { environment } from '../../environments/environment';
import { ReservationRequestDTO }  from '../models/reservation-request.dto';
import { ReservationResponseDTO } from '../models/reservation-response.dto';

@Injectable({ providedIn: 'root' })
export class ReservationsService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /** Crează o rezervare pentru o locație */
  book(locId: number, payload: ReservationRequestDTO): Observable<ReservationResponseDTO> {
    return this.http.post<ReservationResponseDTO>(
      `${this.api}/locations/${locId}/reservations`,
      payload
    );
  }

  /** Listează rezervările mele */
  myReservations(): Observable<ReservationResponseDTO[]> {
    return this.http.get<ReservationResponseDTO[]>(
      `${this.api}/reservations/me`
    );
  }

  /** Rezervări primite pentru toate locațiile owner-ului */
  getOwnerReservations(): Observable<ReservationResponseDTO[]> {
    return this.http.get<ReservationResponseDTO[]>(
      `${this.api}/reservations/owner`
    );
  }

  /** Șterge o rezervare proprie */
  cancel(resId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/reservations/${resId}`
    );
  }
}
