import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule,NgIf } from '@angular/common';

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

  redirectToGit() {
    window.open('https://github.com/S5-2024/angular_letterfood', '_blank'); // Abre em uma nova aba
  }



}
