import { Component, inject, Input } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';
import { Chart, ChartConfiguration, ChartItem } from 'chart.js/auto';
import { ReviewCardComponent } from '../review-card/review-card.component';

const MONEY_BAG = environment.icons['money-bag']
const REVIEW_STAR = environment.icons['review-star']
const DISTANCE_FOOT = environment.icons['distance-foot']

@Component({
  selector: 'store-details',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, ReviewCardComponent],
  host: {
    //Customizando componentes do Angular Material
    '[style.--mdc-tab-indicator-active-indicator-color]': '_color',
    '[style.--mat-tab-header-active-focus-indicator-color]': '_color',
    '[style.--mat-tab-header-active-hover-indicator-color]': '_color',
    '[style.--mdc-secondary-navigation-tab-container-height]': '_size',
    '[style.--mat-tab-header-label-text-size]': '_labelSize',
    '[style.--mat-tab-header-active-hover-label-text-color]': '_textColor',
    '[style.--mat-tab-header-inactive-hover-label-text-color]': '_textColor',
    '[style.--mat-tab-header-inactive-label-text-color]': '_textColor',
    '[style.--mat-tab-header-active-label-text-color]': '_textColor',
    '[style.--mat-tab-header-active-focus-label-text-color]': '_textColor'
  },
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.css'
})
export class StoreDetailsComponent {
  @Input() storeInfo !: any;
  private _color: any = '#C78CA0';
  private _size: any = "104px";
  private _labelSize: any = '1.875rem';
  private _textColor: any = '#C78CA0';



  ngOnInit(){
    console.log((window.innerWidth * 0.055).toString)
  }

  onTabChange($event: MatTabChangeEvent){
    const tabLabel = $event.tab.textLabel

    if(tabLabel == "Avaliações"){
      const canvas = <ChartItem> document.getElementById("canvas");
      const config: ChartConfiguration = {
        type: "bar",
        data: {
          labels: [1,2,3,4,5],
          datasets: [{
            borderWidth: 1,
            data: [0,10,20,30,40],
          }]
        },
        options:{
          indexAxis: 'y',
          
          scales: {
            y: {
              beginAtZero: true,
            },
            x:{
              min: 0,
              max: 60
            }
          }
        }
      };
      new Chart(canvas, config);
    }
  }

}