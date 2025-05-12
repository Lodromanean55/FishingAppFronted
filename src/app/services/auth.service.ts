import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment }   from '../../environments/environment';

export interface AuthResponse {
  token:     string;
  username:  string;
  tokenType?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly userKey  = 'username';

  constructor(private http: HttpClient) {}

  /** Înregistrează un user nou pe backend */
  register(payload: {
    username: string;
    email:    string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/register`, payload
    );
  }

  /** Login: primește JWT + username și le salvează */
  login(payload: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`, payload
    ).pipe(
      tap(res => {
        console.log('Response from backend', res);
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem(this.userKey,  res.username);
      })
    );
  }

  /** Returnează token-ul din localStorage sau null */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /** Returnează username-ul stocat sau null */
  getUsername(): string | null {
    return localStorage.getItem(this.userKey);
  }

  /** Verifică prezența token-ului */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Șterge token + username */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
