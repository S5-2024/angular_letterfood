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
  @Input() type: string = "details"
  userName: string = "Anonimo"
  protected arrTemplate!: Array<number>
  constructor(private userService: UserService){}

  ngOnInit(){
    this.checkName()
    console.log(this.review)
    this.arrTemplate = Array(Math.round(this.review.nota)).fill(0)
 /*    let soma = 0
    this.storeInfo.avaliacoes.forEach( (review: any) => {
      soma += review.nota
    } )
    let tam = soma / this.storeInfo.avaliacoes.length
    this.arrTemplate = Array(tam).fill(0) */
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
