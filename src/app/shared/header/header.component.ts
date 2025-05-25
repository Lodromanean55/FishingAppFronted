import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { AuthService }          from '../../services/auth.service';
import { LocationsService }     from '../../services/locations.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showOwnerLink = false;

  constructor(
    public auth: AuthService,
    private locSvc: LocationsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      // verificăm dacă user-ul are cel puțin o locație
      this.locSvc.getMyLocations().subscribe(locs => {
        this.showOwnerLink = locs.length > 0;
      });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
