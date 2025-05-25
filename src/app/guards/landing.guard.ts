// src/app/guards/landing.guard.ts
import { Injectable }              from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService }             from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LandingGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isLoggedIn()) {
      // Dacă eşti logat, du-te la /home
      this.router.navigate(['/home']);
      return false;
    }
    // Dacă nu eşti logat, poţi vedea landing-ul
    return true;
  }
}
