import { Component, ViewChild } from '@angular/core';
import { StoreDetailsComponent } from '../../components/store-details/store-details.component';
import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { CdkPortal,PortalModule } from '@angular/cdk/portal';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StoreDetailsComponent, OverlayModule, PortalModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild(CdkPortal) portal !: CdkPortal
  
  constructor(private overlay: Overlay){}


  // Configurando e abrindo modal de detalhes da loja
  openModal(){
    const config = new OverlayConfig(
      {
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true,
        /* panelClass: "teste_class" */
      }
    );
    const overlayRef = this.overlay.create(config)
    //Quando clica no backdrop ele fecha o modal
    overlayRef.backdropClick().subscribe( () => {overlayRef.detach()}); 
    overlayRef.attach(this.portal)

  }

}
