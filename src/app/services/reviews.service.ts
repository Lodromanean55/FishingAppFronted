import { Injectable }     from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { Observable }     from 'rxjs';
import { environment }    from '../../environments/environment';
import { ReviewRequestDTO }  from '../models/review-request.dto';
import { ReviewResponseDTO } from '../models/review-response.dto';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private readonly url = `${environment.apiUrl}/locations`;

  constructor(private http: HttpClient) {}

  list(locationId: number): Observable<ReviewResponseDTO[]> {
    return this.http.get<ReviewResponseDTO[]>(`${this.url}/${locationId}/reviews`);
  }

  create(locationId: number, dto: ReviewRequestDTO): Observable<ReviewResponseDTO> {
    return this.http.post<ReviewResponseDTO>(`${this.url}/${locationId}/reviews`, dto);
  }
}
