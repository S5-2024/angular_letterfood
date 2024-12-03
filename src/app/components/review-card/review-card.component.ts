import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Review } from '../../models/review';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'review-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review: any;
  @Input() type: string = "details"
  userName: string = "Anonimo"
  userImage: any;
  protected arrTemplate!: Array<number>
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.checkName()
    this.getUserImage(this.review.usuario._id)
    console.log(this.review)
    this.arrTemplate = Array(Math.round(this.review.nota)).fill(0)
  }
  checkName() {
    if (this.review.usuario.nome != null) {
      this.userName = this.review.usuario.nome
    }
  }
  getRateIndex() {
    return Array(Math.round(this.review.nota)).fill(0)
  }
  getUserImage(id: string) {
    this.userService.getById(id).subscribe(
      {
        next: (value) => {
          if (value.foto == undefined) {
            this.userImage = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          } else {
            this.userImage = `http://localhost:3000/${value.foto}`
          }

        },
        error: (err) => console.log(err),
        complete: () => console.log(this.userImage)
      }
    )
  }
}
