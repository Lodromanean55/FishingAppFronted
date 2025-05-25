// src/app/reservations/booking.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';

// header & footer
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  errorMsg = '';
  private locId!: number;

  constructor(
    private fb: FormBuilder,
    private svc: ReservationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.locId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      // păstrăm string-ul "YYYY-MM-DD"
      date:    ['',    [Validators.required]],
      persons: [1,     [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // întrebăm utilizatorul dacă e sigur
    if (!confirm('Sigur vrei să faci această rezervare?')) {
      return;
    }

    const isoDate: string = this.form.value.date;
    const { persons } = this.form.value;

    this.svc.book(this.locId, { date: isoDate, persons })
      .subscribe({
        next: () => {
          alert('Rezervare creată cu succes!');
          this.router.navigate(['/reservations/me']);
        },
        error: err => {
          // dacă balta e full, server-ul ne-a trimis deja un mesaj care începe cu "Balta este full"
          this.errorMsg = err.error?.message || 'Eroare la rezervare';
        }
      });
  }
}
