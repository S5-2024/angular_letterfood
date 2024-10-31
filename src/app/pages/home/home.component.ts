import { Component } from '@angular/core';
import { StoreDetailsComponent } from '../../components/store-details/store-details.component';
import { StoreCardComponent } from "../../components/store-card/store-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StoreDetailsComponent, StoreCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
