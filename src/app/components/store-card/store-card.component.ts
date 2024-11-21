import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Restaurant } from '../../models/restaurant';
@Component({
  selector: 'store-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css'
})
export class StoreCardComponent {

  @Input() storeInfo!: Restaurant
  arrTemplate:Array<number> = Array()

  constructor(){
  }

  ngOnInit(){
    let soma = 0
    this.storeInfo.reviews.forEach( (review) => {
      soma += review.rate
    } )

    let tam = soma / this.storeInfo.reviews.length
    this.arrTemplate = Array(tam).fill(0)

  }

}
