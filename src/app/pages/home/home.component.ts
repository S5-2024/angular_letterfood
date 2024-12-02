import { Component, ViewChild } from '@angular/core';
import { StoreDetailsComponent } from '../../components/store-details/store-details.component';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { StoreCardComponent } from "../../components/store-card/store-card.component";
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';
import { RestaurantsService } from '../../services/restaurants.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StoreDetailsComponent, StoreCardComponent,  OverlayModule, PortalModule, MatIconModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(CdkPortal) portal !: CdkPortal
  private overlayRef;
  /* protected storeList = environment.restaurants */
  protected storeList: any[] = [];
  protected selectedStore : any = null






  constructor(private overlay: Overlay, private restaurantService: RestaurantsService) {
    const config = new OverlayConfig(
      {
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true,
        /* panelClass: "teste_class" */
      }
    );
    this.overlayRef = this.overlay.create(config);
  }
  ngOnInit() {
    this.getStoreList()

  }


  // Configurando e abrindo modal de detalhes da loja
  openModal(store: any) {
    //Quando clica no backdrop ele fecha o modal
    this.selectedStore = store
    this.overlayRef.backdropClick().subscribe(() => { this.overlayRef.detach() });
    this.overlayRef.attach(this.portal)

  }


  closeModal() {
    this.overlayRef.detach()
  }



// Área de teste

popRestaurants = [
  {
    name: 'China In Box',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/China_in_box_logo.png'
  },
  {
    name: 'McDonald\'s',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/McDonald%27s_logo.svg'
  },
  {
    name: 'Starbucks',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Starbucks_Corporation_Logo_2011.svg'
  },
  {
    name: 'Burger King',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Burger_King_2020.svg'
  },
  {
    name: 'Subway',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Subway_2016_logo.svg'
  }
]


  restaurants = [
  {
    name: 'McDonald\'s',
    imageUrl: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png'
  },
  {
    name: 'Starbucks',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Starbucks_Corporation_Logo_2022.png'
  },
  {
    name: 'Burger King',
    imageUrl: 'https://1000logos.net/wp-content/uploads/2017/03/Burger-King-Logo.png'
  },
  {
    name: 'Subway',
    imageUrl: 'https://1000logos.net/wp-content/uploads/2017/03/Subway-logo.png'
  },
  {
    name: 'Domino\'s Pizza',
    imageUrl: 'https://1000logos.net/wp-content/uploads/2017/03/Dominos-Pizza-Logo.png'
  },
  {
    name: 'Pizza Hut',
    imageUrl: 'https://1000logos.net/wp-content/uploads/2017/03/Pizza-Hut-Logo.png'
  },
  {
    name: 'Taco Bell',
    imageUrl: 'https://1000logos.net/wp-content/uploads/2017/03/Taco-Bell-Logo.png'
  },
  {
    name: 'Wendy\'s',
    imageUrl: 'https://1000logos.net/wp-content/uploads/2021/05/Wendys-logo.png'
  }
];


}
