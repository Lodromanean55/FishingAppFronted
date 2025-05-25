import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { ReservationResponseDTO }    from '../../models/reservation-response.dto';
import { ReservationsService }       from '../../services/reservations.service';
import { LocationsService }          from '../../services/locations.service';
import { environment }               from '../../../environments/environment';
import { HeaderComponent }           from '../../shared/header/header.component';
import { FooterComponent }           from '../../shared/footer/footer.component';

interface MyResWithImage extends ReservationResponseDTO {
  imageUrl: string;
}

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  reservations: MyResWithImage[] = [];
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
    this.svc.myReservations().pipe(
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
    if (!confirm('Sigur vrei să ștergi rezervarea?')) return;
    this.svc.cancel(id).subscribe({
      next: () => this.load(),
      error: err => this.errorMsg = err.error?.message || 'Eroare la ștergerea rezervării'
    });
  }
}
