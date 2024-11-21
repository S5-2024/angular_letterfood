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

  @Input() storeInfo!: any
  arrTemplate:Array<number> = Array()

  constructor(){
  }

  ngOnInit(){
    let soma = 0
    this.storeInfo.avaliacoes.forEach( (review: any) => {
      soma += review.nota
    } )
    console.log(this.storeInfo.avaliacoes.length)
    let tam = soma / this.storeInfo.avaliacoes.length
    this.arrTemplate = Array(tam).fill(0)

  }

}
