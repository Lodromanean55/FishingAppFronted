import { Component, OnInit }       from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ActivatedRoute }          from '@angular/router';
import { FishingLocationResponseDTO } from '../../models/fishing-location-response.dto';
import { LocationsService }        from '../../services/locations.service';
import { HeaderComponent }         from '../../shared/header/header.component';
import { FooterComponent }         from '../../shared/footer/footer.component';
import { environment }             from '../../../environments/environment';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  location?: FishingLocationResponseDTO;

  // Vrem doar baza fără `/api`
  backendUrl = environment.apiUrl.replace(/\/api$/, '');

  constructor(
    private route: ActivatedRoute,
    private locationsService: LocationsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.locationsService.getById(id).subscribe({
        next: loc => this.location = loc,
        error: err => console.error('Eroare la detaliu location:', err)
      });
    }
  }

  get rulesLines(): string[] {
    return this.location?.rules
      ? this.location.rules.split('\n').map(l => l.trim()).filter(l => !!l)
      : [];
  }

  getImageUrl(path: string): string {
    // dacă path e deja complet (ex: http...) îl folosim direct
    return path.startsWith('http')
      ? path
      : `${this.backendUrl}/${path}`;
  }
}
