import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule }                            from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ReviewsService }                          from '../../services/reviews.service';
import { ReviewRequestDTO }                        from '../../models/review-request.dto';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Input() locationId!: number;
  @Output() submitted = new EventEmitter<void>();

  form: FormGroup;
  ratings = [5, 4, 3, 2, 1];

  constructor(
    private fb: FormBuilder,
    private reviewsSvc: ReviewsService
  ) {
    this.form = this.fb.group({
      rating:  [null, Validators.required],
      comment: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    const dto = this.form.value as ReviewRequestDTO;
    this.reviewsSvc.create(this.locationId, dto)
      .subscribe(() => {
        this.form.reset();
        this.submitted.emit();
      });
  }
}
