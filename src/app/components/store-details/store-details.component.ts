import { Component, inject, Input } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { environment } from '../../../environments/environment.development';
import { ReviewCardComponent } from '../review-card/review-card.component';
import * as echarts from 'echarts';
import { Review } from '../../models/review';
import { GoogleMapsModule } from '@angular/google-maps'
import { MatIconModule } from '@angular/material/icon';
import { RestaurantsService } from '../../services/restaurants.service';
import { GeneralApiService } from '../../services/general-api.service';


const MONEY_BAG = environment.icons['money-bag']
const REVIEW_STAR = environment.icons['review-star']
const DISTANCE_FOOT = environment.icons['distance-foot']

@Component({
  selector: 'store-details',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, ReviewCardComponent, GoogleMapsModule],
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
  protected reviewList: any[] = []
  private _color: any = '#C78CA0';
  private _size: any = "104px";
  private _labelSize: any = '1.875rem';
  private _textColor: any = '#C78CA0';

  protected center!: google.maps.LatLngLiteral;
  protected mapOptions!: google.maps.MapOptions;

  constructor(private generalService: GeneralApiService, private restaurantService: RestaurantsService) {

  }

  ngOnInit() {
    console.log(this.storeInfo)
    this.getReviews()
    console.log(this.reviewList)
    this.getCenter()
  }

  getCenter() {
    /*  console.log(this.storeInfo.endereco.rua) */
    this.generalService.getLatitudeAndLongitude(this.storeInfo.endereco.rua).subscribe({ //COLOCAR MARKER
      next: (data) => {
        console.log(data)
        this.mapOptions = {
          mapId: "LOCATION_MAP",
          center: {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          },
          zoom: 33,
          cameraControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }
      }
    })
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
      width: 500,
      height: 250,
    })
    const options: echarts.EChartsOption = {
      tooltip: {},
      grid: {
        height: 150,
        top: 40,
        left: '25%',
        right: '30%',
      },

      xAxis: {
        show: false,
        min: 1

      },
      yAxis: {
        offset: 20,
        axisLine: {
          show: false,
          onZero: false,
        },
        /* min: this.getMinValue(), */
        axisTick: {
          show: false,
          /* alignWithLabel: true */
        },
        data: [1, 2, 3, 4, 5],
        axisLabel: {
          formatter: (value: any) => {
            let txt = `{${value}|}`
            if (parseInt(value) != 1) {
              for (let i = 1; i < parseInt(value); i++) {
                txt += `{${value}|}`
              }
            }
            return txt
          },
          align: 'right',
          rich: {
            1: {
              width: 'auto',
              height: 15,
              align: 'center',
              backgroundColor: {
                image: this.encodeSvgToDataURI(environment.icons['review-star']),
              }
            },
            2: {
              width: 'auto',
              height: 15,
              align: 'center',
              backgroundColor: {
                image: this.encodeSvgToDataURI(environment.icons['review-star']),
              },
              baseline: 'bottom',
              verticalAlign: 'bottom',

            },
            3: {
              width: 'auto',
              height: 15,
              align: 'center',
              backgroundColor: {
                image: this.encodeSvgToDataURI(environment.icons['review-star']),
              },
              baseline: 'bottom',
              verticalAlign: 'bottom',

            },
            4: {
              width: 'auto',
              height: 15,
              align: 'center',
              backgroundColor: {
                image: this.encodeSvgToDataURI(environment.icons['review-star']),
              },
              baseline: 'bottom',
              verticalAlign: 'bottom',

            },
            5: {
              width: 'auto',
              height: 15,
              align: 'center',

              backgroundColor: {
                image: this.encodeSvgToDataURI(environment.icons['review-star']),
              },
              baseline: 'bottom',
              verticalAlign: 'bottom',

            }
          },
        }

      },
      series: [
        {
          type: 'bar',
          label: {
            show: true,
            position: 'outside',
            align: 'left'
          },
          data: this.getReviewNumbers(),
          color: '#C78CA0',
          itemStyle: {
            borderRadius: 20,
          },
          barMinHeight: 80,
        }
      ]
    }



    chart.setOption(options)
  }
  encodeSvgToDataURI(svg: any) {
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


  getReviews() {
    this.restaurantService.getAvaliacoes().subscribe(
      {
        next: (data) => {
          data.forEach((item: any) => {
            if (item.restaurante._id == this.storeInfo._id) {
              this.reviewList.push(item)
            }
          })
        },
        error: (err) => console.error(err),
      }
    )
  }

  createReview() {
    const rate = (<HTMLInputElement>document.getElementById("rate"));
    const comment = (<HTMLInputElement>document.getElementById("comment"))
    let user = JSON.parse(localStorage.getItem('user')!).usuario

    if(rate.value == "" || comment.value == ""){
      alert("Favor preencher todos os campos")
    }else{
      const body = {
        restaurante: this.storeInfo._id,
        usuario: user._id,
        nota: rate.value,
        comentario: comment.value
      }
      this.restaurantService.createAvaliacoes(body).subscribe({
        next: (res)=> console.log(res),
        error: (err)=> console.error(err),
        complete: () => alert("Comentario criado")
      })
    }

   
  }

  getReviewNumbers() {
    let starClass: { [key: number]: Review[] } = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }
    for (let review of this.storeInfo.avaliacoes) {
      if (starClass[review.nota] !== undefined) {
        starClass[review.nota].push(review)
      }
    }
    let r: any = []
    Object.entries(starClass).forEach((review) => {
      r.push(review[1].length)
    })
    return r
  }

}