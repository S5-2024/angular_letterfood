import { Component, inject, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';

const MONEY_BAG = environment.icons['money-bag']
const REVIEW_STAR = environment.icons['review-star']
const DISTANCE_FOOT = environment.icons['distance-foot']

@Component({
  selector: 'store-details',
  standalone: true,
  imports: [MatTabsModule, MatIconModule],
  host: {
    //Customizando componentes do Angular Material
    '[style.--mdc-tab-indicator-active-indicator-color]': '_color',
    '[style.--mat-tab-header-active-focus-indicator-color]': '_color',
    '[style.--mat-tab-header-active-hover-indicator-color]': '_color',
    '[style.--mdc-secondary-navigation-tab-container-height]' : '_size'
  },
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.css'
})
export class StoreDetailsComponent {
  @Input() storeInfo !: any;
  private _color: any = '#C78CA0'
  private _size: any = '104px'

  constructor(){
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)

    iconRegistry.addSvgIconLiteral('money-bag', 
      sanitizer.bypassSecurityTrustHtml(MONEY_BAG))
    iconRegistry.addSvgIconLiteral('review-star',
      sanitizer.bypassSecurityTrustHtml(REVIEW_STAR)
    )
    iconRegistry.addSvgIconLiteral('distance-foot', 
      sanitizer.bypassSecurityTrustHtml(DISTANCE_FOOT)
    )
  }
}
