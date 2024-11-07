import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';

const MONEY_BAG = environment.icons['money-bag']
const REVIEW_STAR = environment.icons['review-star']
const DISTANCE_FOOT = environment.icons['distance-foot']

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
  }
}
