import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Review } from '../../models/review';

@Component({
  selector: 'review-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review!:Review;



  getRateIndex(){ //! GAMBIARRA
    return Array(this.review.rate).fill(0)
  }
}
