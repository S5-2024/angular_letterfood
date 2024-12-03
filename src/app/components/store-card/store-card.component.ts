import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Restaurant } from '../../models/restaurant';
import { RestaurantsService } from '../../services/restaurants.service';
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
  protected img!: string

  constructor(private restaurantService: RestaurantsService){
  }

  ngOnInit(){
    this.getReviews()
    this.formatImg = this.storeInfo.foto[0] == '/' ? this.storeInfo.foto.substring(1) : this.storeInfo.foto
  }
  formatImg(){
    if(this.storeInfo.foto[0] == "/"){
      this.storeInfo.foto = this.storeInfo.foto.substring(1)
    }
  }
  getReviews() {
    this.restaurantService.getAvaliacoes().subscribe(
      {
        next: (data) => {
          data.forEach((item: any) => {
            if (item.restaurante._id == this.storeInfo._id) {
              this.storeInfo.avaliacoes.push(item)
            }
          })
        },
        error: (err) => console.error(err),
      }
    )
  }

  getStars(){
    let soma = 0
    this.storeInfo.avaliacoes.forEach( (review: any) => {
      soma += review.nota
    } )
    let tam = soma / this.storeInfo.avaliacoes.length
    this.arrTemplate = Array(tam).fill(0)
  }
}
