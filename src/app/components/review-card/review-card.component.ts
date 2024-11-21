import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Review } from '../../models/review';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'review-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review:any;
  userName!: string
  
  constructor(private userService: UserService){}

  ngOnInit(){
    this.getUserResponsible()
  }

  getUserResponsible(){
    this.userService.getById(this.review.userId).subscribe({
      next: (data) => {
        this.userName = data.nome
      },
      error: (err) => console.error(err),
    })
  }
  getRateIndex(){
    return Array(this.review.nota).fill(0)
  }
}
