// src/app/home/home.component.ts
import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';
import { CommonModule }                 from '@angular/common';
import { LocationsService }             from '../services/locations.service';
import { FishingLocationResponseDTO }   from '../models/fishing-location-response.dto';
import { HeaderComponent }              from '../shared/header/header.component';
import { FooterComponent }              from '../shared/footer/footer.component';
import { environment }                  from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  locations: FishingLocationResponseDTO[] = [];
  backendUrl = environment.apiUrl.replace(/\/api$/, '');

  constructor(
    private router: Router,
    private locationsService: LocationsService
  ) {}

  ngOnInit(): void {
    this.locationsService.getAll().subscribe({
      next: locs => this.locations = locs,
      error: err => console.error('Eroare la getAll():', err)
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/locations', id]);
  }

  /** Dacă vrei să repeți logica în home */
  getImageUrl(path: string): string {
    return `${this.backendUrl}/${path}`;
  }
}
