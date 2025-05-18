import { Component, Input, OnInit } from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReviewResponseDTO }        from '../../models/review-response.dto';
import { ReviewsService }           from '../../services/reviews.service';
import { ReviewFormComponent }      from '../review-form/review-form.component';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, ReviewFormComponent],
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() locationId!: number;
  reviews: ReviewResponseDTO[] = [];

  constructor(private reviewsSvc: ReviewsService) {}

  ngOnInit() {
    this.load();
  }

  private load() {
    this.reviewsSvc.list(this.locationId)
      .subscribe(list => this.reviews = list);
  }

  /** Reîncarcă lista după submit */
  onSubmitted() {
    this.load();
  }
}
