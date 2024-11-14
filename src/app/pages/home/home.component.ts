import { Component, ViewChild } from '@angular/core';
import { StoreDetailsComponent } from '../../components/store-details/store-details.component';
import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { CdkPortal,PortalModule } from '@angular/cdk/portal';
import { StoreCardComponent } from "../../components/store-card/store-card.component";
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [StoreDetailsComponent, StoreCardComponent,  OverlayModule, PortalModule, MatIconModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(CdkPortal) portal !: CdkPortal
  private overlayRef;
  protected storeList = environment.restaurants
  constructor(private overlay: Overlay){
    const config = new OverlayConfig(
      {
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true,
        /* panelClass: "teste_class" */
      }
    );
    this.overlayRef = this.overlay.create(config);
  }


  // Configurando e abrindo modal de detalhes da loja
  openModal(){
    //Quando clica no backdrop ele fecha o modal
    this.overlayRef.backdropClick().subscribe(() => {this.closeModal()}); 
    this.overlayRef.attach(this.portal)

  }


  closeModal(){
    this.overlayRef.detach()
  }
}
