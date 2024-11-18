import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';
import { Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';

const MONEY_BAG = environment.icons['money-bag'];
const REVIEW_STAR = environment.icons['review-star'];
const DISTANCE_FOOT = environment.icons['distance-foot'];
const LOGOS_GOOGLE_ICON = environment.icons['logos--google-icon'];
const SOLAR_CAT_BOLD = environment.icons['solar--cat-bold'];
const IC_ROUND_SETTINGS = environment.icons['ic--round-settings'];
const HOME_2_FILL = environment.icons['home-2-fill'];
const BASELINE_SEARCH = environment.icons['baseline-search'];
const SOLAR_HEART_BOLD = environment.icons['solar-heart-bold'];
const TRESURE_IMAGE = environment.icons['tresure-image'];
const LOCATION_IMAGE = environment.icons['location-image'];
const ORDER_FOOD_IMAGE = environment.icons['order-food-image'];
const GITHUB_ICON = environment.icons['github-icon'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'letterfood';
  
  constructor(private router: Router){
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    
    for(let icon in Object.entries(environment.icons)){
      iconRegistry.addSvgIconLiteral(Object.entries(environment.icons)[icon][0], 
            sanitizer.bypassSecurityTrustHtml(Object.entries(environment.icons)[icon][1]))
      }
    }
}
