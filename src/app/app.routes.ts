// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent }           from './login/login.component';
import { RegisterComponent }        from './register/register.component';
import { HomeComponent }            from './home/home.component';
import { AuthGuard }                from './guards/auth.guard';

import { LocationDetailComponent }  from './locations/location-detail/location-detail.component';

export const routes: Routes = [
  // 1) rădăcina atunci când eşti logat arată HomeComponent
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  // 2) login şi register rămân publice
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 4) rută pentru pagina de detaliu a unei locații
  { path: 'locations/:id', component: LocationDetailComponent, canActivate: [AuthGuard] },

  // 5) pentru cine tastează /home pur şi simplu redirecţionează la /
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // 6) orice altceva -> acasă (care e protejat de guard)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
