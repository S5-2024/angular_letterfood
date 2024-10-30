import { Component } from '@angular/core';
import { StoreDetailsComponent } from '../../components/store-details/store-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StoreDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
