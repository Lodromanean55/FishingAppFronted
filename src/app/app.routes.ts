// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent }           from './login/login.component';
import { RegisterComponent }        from './register/register.component';
import { HomeComponent }            from './home/home.component';
import { AuthGuard }                from './guards/auth.guard';

import { LocationDetailComponent }  from './locations/location-detail/location-detail.component';
import { LocationFormComponent }    from './locations/location-form/location-form.component';

export const routes: Routes = [
  // 1) rădăcina atunci când eşti logat arată HomeComponent
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  // 2) login şi register rămân publice
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 3) formular de creare locație
  { path: 'locations/new', component: LocationFormComponent, canActivate: [AuthGuard] },

  // 4) editare locație
  { path: 'locations/:id/edit', component: LocationFormComponent, canActivate: [AuthGuard] },

  // 5) pagina de detaliu a unei locații
  { path: 'locations/:id', component: LocationDetailComponent, canActivate: [AuthGuard] },

  // 6) pentru cine tastează /home redirecționează la /
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // 7) orice altceva -> acasă (care e protejat de guard)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
