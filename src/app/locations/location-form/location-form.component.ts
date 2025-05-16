import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { LocationsService }  from '../../services/locations.service';
import { FishingLocationRequestDTO } from '../../models/fishing-location-request.dto';
import { FishingLocationResponseDTO } from '../../models/fishing-location-response.dto';
import { HeaderComponent }   from '../../shared/header/header.component';
import { FooterComponent }   from '../../shared/footer/footer.component';
import { LocalizationDTO }   from '../../models/localization.dto';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  locationId?: number;

  /** fișierele selectate */
  selectedFiles: File[] = [];
  /** URL-urile de previzualizare */
  previewUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private locationsService: LocationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name:           ['', Validators.required],
      address:        ['', Validators.required],
      description:    [''],
      hasBoatFishing: [false],
      maxPersons:     [1, [Validators.required, Validators.min(1)]],
      rules:          [''],
      pricePerPerson: [null, [Validators.required, Validators.min(0.01)]],

      localizations:  this.fb.array([]),
      facilities:     this.fb.array([]),
      species:        this.fb.array([]),

      numberOfStands: [0, [Validators.min(0)]],
      equipmentRental:[false]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.locationId = +id;
        this.locationsService.getById(this.locationId)
          .subscribe(loc => this.populateForm(loc));
      } else {
        this.addLocalization();
        this.addFacility();
        this.addSpecies();
      }
    });
  }

  // shortcut-uri
  get localizations() { return this.form.get('localizations') as FormArray; }
  get facilities()    { return this.form.get('facilities')    as FormArray; }
  get species()       { return this.form.get('species')       as FormArray; }

  addLocalization() {
    this.localizations.push(
      this.fb.group({
        city:       ['', Validators.required],
        distanceKm: [0,  [Validators.required, Validators.min(0)]],
        duration:   ['', Validators.required]
      })
    );
  }
  removeLocalization(i: number) { this.localizations.removeAt(i); }

  addFacility()   { this.facilities.push(this.fb.control('', Validators.required)); }
  removeFacility(i: number) { this.facilities.removeAt(i); }

  addSpecies()    { this.species.push(this.fb.control('', Validators.required)); }
  removeSpecies(i: number) { this.species.removeAt(i); }

  /** când userul alege file(s) */
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const files = Array.from(input.files);
    // adaugă noi fișiere, fără a șterge pe cele vechi
    files.forEach(f => {
      this.selectedFiles.push(f);
      // creează URL pentru previzualizare
      this.previewUrls.push(URL.createObjectURL(f));
    });
    // golește input-ul ca să poți re-selecta același fișier dacă vrei
    input.value = '';
  }

  /** scoate un fișier din listă */
  removeFile(idx: number) {
    // eliberează URL-ul
    URL.revokeObjectURL(this.previewUrls[idx]);
    this.previewUrls.splice(idx, 1);
    this.selectedFiles.splice(idx, 1);
  }

  private populateForm(loc: FishingLocationResponseDTO) {
    this.form.patchValue({
      name:           loc.name,
      address:        loc.address,
      description:    loc.description,
      hasBoatFishing: loc.hasBoatFishing,
      maxPersons:     loc.maxPersons,
      rules:          loc.rules,
      pricePerPerson: loc.pricePerPerson,
      numberOfStands: loc.numberOfStands,
      equipmentRental: loc.equipmentRental
    });

    this.localizations.clear();
    loc.localizations.forEach(l =>
      this.localizations.push(
        this.fb.group({
          city:       [l.city,       Validators.required],
          distanceKm: [l.distanceKm, [Validators.required, Validators.min(0)]],
          duration:   [l.duration,   Validators.required]
        })
      )
    );

    this.facilities.clear();
    loc.facilities.forEach(f =>
      this.facilities.push(this.fb.control(f, Validators.required))
    );

    this.species.clear();
    loc.species.forEach(s =>
      this.species.push(this.fb.control(s, Validators.required))
    );

    // nu încărcăm previzualizări pentru imaginile deja salvate aici
  }

  submit() {
    if (this.form.invalid) return;

    const payload = this.form.value as FishingLocationRequestDTO;
    const save$ = this.isEdit && this.locationId
      ? this.locationsService.update(this.locationId, payload)
      : this.locationsService.create(payload);

    save$.subscribe(res => this.afterSave(res.id));
  }

  private afterSave(id: number) {
    if (this.selectedFiles.length) {
      this.locationsService.uploadImages(id, this.selectedFiles)
        .subscribe(() => this.router.navigate(['/locations', id]));
    } else {
      this.router.navigate(['/locations', id]);
    }
  }
}
