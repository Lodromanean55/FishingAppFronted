import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { ReservationResponseDTO } from '../../models/reservation-response.dto';
import { ReservationsService }    from '../../services/reservations.service';
import { LocationsService }       from '../../services/locations.service';
import { environment }            from '../../../environments/environment';
import { HeaderComponent }        from '../../shared/header/header.component';
import { FooterComponent }        from '../../shared/footer/footer.component';

interface OwnerResWithImage extends ReservationResponseDTO {
  imageUrl: string;
}

@Component({
  selector: 'app-owner-reservations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './owner-reservations.component.html',
  styleUrls: ['./owner-reservations.component.css']
})
export class OwnerReservationsComponent implements OnInit {
  reservations: OwnerResWithImage[] = [];
  errorMsg = '';
  backendUrl = environment.backendUrl;

  constructor(
    private svc: ReservationsService,
    private locSvc: LocationsService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.errorMsg = '';
    this.svc.getOwnerReservations().pipe(
      switchMap(list => {
        const calls = list.map(r =>
          this.locSvc.getById(r.locationId).pipe(
            map(loc => ({
              ...r,
              imageUrl: loc.imagePaths?.[0]
                ? `${this.backendUrl}/${loc.imagePaths[0]}`
                : 'assets/placeholder.jpg'
            }))
          )
        );
        return forkJoin(calls);
      })
    ).subscribe({
      next: full => this.reservations = full,
      error: err => this.errorMsg = err.error?.message || 'Eroare la încărcarea rezervărilor'
    });
  }

  cancel(id: number) {
    if (!confirm('Sigur vrei să ștergi această rezervare?')) return;
    this.svc.cancel(id).subscribe(() => this.load());
  }
}
