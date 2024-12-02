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
  userName: string = "Anonimo"
  
  constructor(private userService: UserService){}

  ngOnInit(){
    this.checkName()
  }
  checkName(){
    if(this.review.usuario.nome != null){
      this.userName = this.review.usuario.nome 
    }
  }
  getRateIndex(){
    return Array(Math.round(this.review.nota)).fill(0)
  }
}
