import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule,NgIf } from '@angular/common';


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
const USER = environment.icons['user'];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, NgIf,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'letterfood';
  showHeader = true; // Controle da visibilidade do header
  currentRoute: string = '';
  
  constructor(private router: Router) {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    for (let icon of Object.entries(environment.icons)) {
      iconRegistry.addSvgIconLiteral(
        icon[0],
        sanitizer.bypassSecurityTrustHtml(icon[1])
      );
    }
  }
  
  ngOnInit() {
    // Monitorar mudanças na rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Atualiza a rota atual
        this.showHeader = !event.url.includes('/about'); // Oculta o header se for a rota /about
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']); // Define o caminho para a página de login
  }

  redirectToHome() {
    if (this.router.url === '/profile' ) { 
      // Verifica se a rota atual é 'profile'
      this.router.navigate(['/homelander']); // Redireciona para a página '/homelander'
    } else {
      this.router.navigate(['']); // Redireciona para a página inicial padrão
    }
  }
  redirectToProfile() {
    this.router.navigate(['/profile']); // Define o caminho para o perfil
  }
}
