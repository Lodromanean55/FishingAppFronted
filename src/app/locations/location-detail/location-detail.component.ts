import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import { CommonModule }               from '@angular/common';
import { RouterModule }               from '@angular/router';
import { ActivatedRoute }             from '@angular/router';
import { LocationsService }           from '../../services/locations.service';
import { FishingLocationResponseDTO } from '../../models/fishing-location-response.dto';
import { HeaderComponent }            from '../../shared/header/header.component';
import { FooterComponent }            from '../../shared/footer/footer.component';
import { environment }                from '../../../environments/environment';
import { ReviewListComponent }        from '../../reviews/review-list/review-list.component';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,         // ← ca să funcționeze [routerLink]
    HeaderComponent,
    FooterComponent,
    ReviewListComponent
  ],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  location?: FishingLocationResponseDTO;
  backendUrl = environment.apiUrl.replace(/\/api$/, '');

  lightboxOpen = false;
  currentIndex = 0;
  lightboxUrl = '';

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
      ? this.location.rules
        .split('\n')
        .map(l => l.trim())
        .filter(l => !!l)
      : [];
  }

  getImageUrl(path: string): string {
    return `${this.backendUrl}/${path}`;
  }

  openLightbox(index: number): void {
    const paths = this.location?.imagePaths;
    if (!paths?.length) return;
    this.currentIndex = index;
    this.lightboxUrl = this.getImageUrl(paths[index]);
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  prevImage(event: MouseEvent): void {
    event.stopPropagation();
    const paths = this.location?.imagePaths;
    if (!paths?.length) return;
    this.currentIndex = (this.currentIndex - 1 + paths.length) % paths.length;
    this.lightboxUrl = this.getImageUrl(paths[this.currentIndex]);
  }

  nextImage(event: MouseEvent): void {
    event.stopPropagation();
    const paths = this.location?.imagePaths;
    if (!paths?.length) return;
    this.currentIndex = (this.currentIndex + 1) % paths.length;
    this.lightboxUrl = this.getImageUrl(paths[this.currentIndex]);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.lightboxOpen) this.closeLightbox();
  }
}
