// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LandingComponent }            from './landing/landing.component';
import { LoginComponent }              from './login/login.component';
import { RegisterComponent }           from './register/register.component';
import { HomeComponent }               from './home/home.component';
import { AuthGuard }                   from './guards/auth.guard';
import { LandingGuard }                from './guards/landing.guard';

import { LocationDetailComponent }     from './locations/location-detail/location-detail.component';
import { LocationFormComponent }       from './locations/location-form/location-form.component';

import { BookingComponent }            from './reservations/booking/booking.component';
import { MyReservationsComponent }     from './reservations/my-reservations/my-reservations.component';
import { OwnerReservationsComponent }  from './reservations/owner-reservations/owner-reservations.component';

export const routes: Routes = [
  // 1) Landing page – doar pentru neautentificați
  { path: '',        component: LandingComponent,           canActivate: [LandingGuard], pathMatch: 'full' },

  // 2) Login și Register – publice
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 3) Zona protejată – necesită autentificare
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // 3.1) Home după login
      { path: 'home', component: HomeComponent },

      // 3.2) redirect intern de la '' la /home
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      // 3.3) CRUD locații
      { path: 'locations/new',      component: LocationFormComponent },
      { path: 'locations/:id/edit', component: LocationFormComponent },
      { path: 'locations/:id',      component: LocationDetailComponent },

      // 3.4) Booking & Rezervări
      { path: 'locations/:id/book',    component: BookingComponent },
      { path: 'reservations/me',       component: MyReservationsComponent },
      { path: 'reservations/location', component: OwnerReservationsComponent },
    ]
  },

  // 4) Tot ce nu se potrivește – redirect la landing
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
