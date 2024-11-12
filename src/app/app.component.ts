import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';

const MONEY_BAG = environment.icons['money-bag']
const REVIEW_STAR = environment.icons['review-star']
const DISTANCE_FOOT = environment.icons['distance-foot']
const LOGOS_GOOGLE_ICON = environment.icons['logos--google-icon']
const SOLAR_CAT_BOLD = environment.icons['solar--cat-bold']
const IC_ROUND_SETTINGS = environment.icons['ic--round-settings']
const HOME_2_FILL = environment.icons['home-2-fill']
const BASELINE_SEARCH = environment.icons['baseline-search']
const SOLAR_HEART_BOLD = environment.icons['solar-heart-bold']
const TRESURE_IMAGE = environment.icons['tresure-image']
const LOCATION_IMAGE = environment.icons['location-image']
const ORDER_FOOD_IMAGE = environment.icons['order-food-image']
const GITHUB_ICON = environment.icons['github-icon']

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
    iconRegistry.addSvgIconLiteral('logos--google-icon',
      sanitizer.bypassSecurityTrustHtml(LOGOS_GOOGLE_ICON)
    );
      iconRegistry.addSvgIconLiteral('solar--cat-bold',
      sanitizer.bypassSecurityTrustHtml(SOLAR_CAT_BOLD)
    );  
      iconRegistry.addSvgIconLiteral('ic--round-settings',
      sanitizer.bypassSecurityTrustHtml(IC_ROUND_SETTINGS)
    ); 
      iconRegistry.addSvgIconLiteral('home-2-fill',
      sanitizer.bypassSecurityTrustHtml(HOME_2_FILL)
    ); 
      iconRegistry.addSvgIconLiteral('baseline-search',
      sanitizer.bypassSecurityTrustHtml(BASELINE_SEARCH)
    ); 
      iconRegistry.addSvgIconLiteral('solar-heart-bold',
      sanitizer.bypassSecurityTrustHtml(SOLAR_HEART_BOLD)
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
      iconRegistry.addSvgIconLiteral('github-icon',
      sanitizer.bypassSecurityTrustHtml(GITHUB_ICON)
    ); 
    
  }
}
