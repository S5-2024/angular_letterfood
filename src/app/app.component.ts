import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';

const MONEY_BAG = environment.icons['money-bag']
const REVIEW_STAR = environment.icons['review-star']
const DISTANCE_FOOT = environment.icons['distance-foot']
const TRESURE_IMAGE = environment.icons['tresure-image']
const LOCATION_IMAGE = environment.icons['location-image']
const ORDER_FOOD_IMAGE = environment.icons['order-food-image']

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'letterfood';
  
  constructor(){
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)

    iconRegistry.addSvgIconLiteral('money-bag',
      sanitizer.bypassSecurityTrustHtml(MONEY_BAG));
    iconRegistry.addSvgIconLiteral('review-star',
      sanitizer.bypassSecurityTrustHtml(REVIEW_STAR)
    );
    iconRegistry.addSvgIconLiteral('distance-foot',
      sanitizer.bypassSecurityTrustHtml(DISTANCE_FOOT)
    );
    iconRegistry.addSvgIconLiteral('tresure-image',
      sanitizer.bypassSecurityTrustHtml(TRESURE_IMAGE)
    );
    iconRegistry.addSvgIconLiteral('location-image',
      sanitizer.bypassSecurityTrustHtml(LOCATION_IMAGE)
    );
    iconRegistry.addSvgIconLiteral('order-food-image',
      sanitizer.bypassSecurityTrustHtml(ORDER_FOOD_IMAGE)
    );
  }
}
