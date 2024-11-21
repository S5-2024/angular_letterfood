import { Component, ViewChild } from '@angular/core';
import { StoreDetailsComponent } from '../../components/store-details/store-details.component';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { StoreCardComponent } from "../../components/store-card/store-card.component";
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';
import { RestaurantsService } from '../../services/restaurants.service';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [StoreDetailsComponent, StoreCardComponent, OverlayModule, PortalModule, MatIconModule],

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

  getStoreList(): void {
    this.restaurantService.getRestaurantList().subscribe({
      next: (data) => {
        this.storeList = data
      },
      error: (err) => console.error(err),
      complete: () => { }
    })
  }
}
