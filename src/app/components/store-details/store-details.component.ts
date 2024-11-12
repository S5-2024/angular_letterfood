import { Component, inject, Input } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';
import { Chart, ChartConfiguration, ChartItem } from 'chart.js/auto';
import { ReviewCardComponent } from '../review-card/review-card.component';
import * as echarts from 'echarts';

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



  ngOnInit() {
    console.log(typeof(this.encodeSvgToDataURI(environment.icons['review-star'])))
  }

  onTabChange($event: MatTabChangeEvent) {
    const tabLabel = $event.tab.textLabel
    if (tabLabel == "Avaliações") {
      this.configureChart()
    }
  }


  configureChart() {
    const svgURL = "https://raw.githubusercontent.com/material-icons/material-icons/af0ed9c0e1276bad43c4d6ca8e8aaa283e425195/svg/star/round.svg"
    const chart = echarts.init(document.getElementById('canvas'), null, {
      width: 300,
      height: 300
    })
    const options: echarts.EChartsOption = {
      title: {
        text: "Placeholder"
      },
      symbol: `image://${svgURL}`,
      tooltip: {},
      xAxis: {},
      yAxis: {
        data: [1, 2, 3, 4, 5],
        axisLabel: {
          formatter: (value:any) => {
            return '{' + value + '| }\n{value|'  + '}';
          },
          rich: {
            1:{
              height: 20,
              align: 'center',
              backgroundColor: {
                image: this.encodeSvgToDataURI(environment.icons['review-star'])
              }
            },
          }
        }

      },
      series: [
        {
          type: 'bar',
          data: [10, 5, 30, 40, 50]
        }
      ]
    }



    chart.setOption(options)
  }

   encodeSvgToDataURI(svg:any) {
    return (
      'data:image/svg+xml;charset=utf8,' +
      encodeURIComponent(
        svg.replace(
          '<svg',
          svg.indexOf('xmlns') > -1
            ? '<svg'
            : '<svg xmlns="http://www.w3.org/2000/svg"'
        )
      )
    );
  }


  /*onTabChange($event: MatTabChangeEvent) {
    const tabLabel = $event.tab.textLabel

    const customPlugin = {

    }




    if (tabLabel == "Avaliações") {
      const canvas = <ChartItem>document.getElementById("canvas");
      const config: ChartConfiguration = {
        type: "bar",
        data: {
          labels: [5, 4, 3, 2, 1],
          datasets: [{
            borderWidth: 1,

            data: [40, 30, 20, 10, 5],
          }]
        },

        options: {
          indexAxis: 'y',
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                callback(tickValue, index, ticks) {

                  return ""
                },
              }

            },
            x: {
              display: false,
              min: 0,
              max: 60,
            },
          },
          plugins: {
            legend: {
              display: false
            },
            
          }
        }
      };
      new Chart(canvas, config);
    }
  }
    */



}