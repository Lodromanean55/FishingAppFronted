// src/app/locations/location-detail/location-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationsService }    from '../../services/locations.service';
import { FishingLocationResponseDTO } from '../../models/fishing-location-response.dto';
import { HeaderComponent }     from '../../shared/header/header.component';
import { FooterComponent }     from '../../shared/footer/footer.component';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  location?: FishingLocationResponseDTO;

  constructor(
    private route: ActivatedRoute,
    private locationsService: LocationsService
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.locationsService.getById(id).subscribe({
        next: (loc: FishingLocationResponseDTO) => {
          this.location = loc;
        },
        error: (err: any) => {
          console.error('Eroare la getById:', err);
        }
      });
    }
  }
}
