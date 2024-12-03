import { Component } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReviewCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userInfo!: any;

  constructor(private restaurantService: RestaurantsService, private router: Router){

  }

  ngOnInit(){
    this.userInfo = JSON.parse(localStorage.getItem("user")!)
    this.getReviewList();
    console.log(this.userInfo)
  }


  getReviewList(){
    this.restaurantService.getAvaliacoes().subscribe({
      next: (data) => {
        console.log(data)
        data.forEach((review: any) => {
          if(review.usuario != null){
            if(review.usuario._id == this.userInfo._id){
              this.userInfo.avaliacoes.push(review)
            }
          }
        });
      }
    })
  }
  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }
}
