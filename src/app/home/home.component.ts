import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';      // ← import necesar pentru *ngIf și *ngFor
import { AuthService } from '../services/auth.service';
import { LocationsService } from '../services/locations.service';
import { FishingLocationResponseDTO } from '../models/fishing-location-response.dto';
import {HeaderComponent} from '../shared/header/header.component';
import {FooterComponent} from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,                               // ← aici păstrăm CommonModule pentru directivele Angular
    HeaderComponent,   // ← adăugat
    FooterComponent,
    RouterLink,
    // ← adăugat
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  locations: FishingLocationResponseDTO[] = [];

  constructor(
    private router: Router,
    public  authService: AuthService,
    private locationsService: LocationsService
  ) {}

  ngOnInit(): void {
    this.locationsService.getAll().subscribe({
      next: locs => {
        console.log('LOCATIONS from API:', locs);
        this.locations = locs;
      },
      error: err => console.error('Eroare la getAll():', err)
    });
  }

  goToLogin()    { this.router.navigate(['/login']); }
  goToRegister() { this.router.navigate(['/register']); }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /** + adăugat acum: */
  goToDetail(id: number): void {
    this.router.navigate(['/locations', id]);
  }
}
