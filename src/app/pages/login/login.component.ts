import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
})
export class LoginComponent implements AfterViewInit {
  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;

  user = {} as User;
  users: User[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    const interBubble = this.el.nativeElement.querySelector('.interactive');

    const move = () => {
      this.curX += (this.tgX - this.curX) / 20;
      this.curY += (this.tgY - this.curY) / 20;
      this.renderer.setStyle(
        interBubble,
        'transform',
        `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`
      );
      requestAnimationFrame(move);
    };

    window.addEventListener('mousemove', (event: MouseEvent) => {
      this.tgX = event.clientX;
      this.tgY = event.clientY;
      move();
    });
  }

  // Script para mudar de login -> registro ou recuperar senha
  formType: string = 'login'; // Inicia com o formulário de login

  toggleForm(type: string) {
    this.formType = type;
  }

  // Tentando fazer conexão com o BD

  ngOnInit() {
    this.userService.getUsers();
  }

  saveUser(form: NgForm) {
    if (this.user.id !== undefined) {
      this.userService.updateUser(this.user).subscribe(() => {
        console.log('User updated');
        this.cleanForm(form);
      });
    } else {
      this.userService
        .saveUser(this.user)
        .subscribe(() => this.cleanForm(form));
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  editUser(user:User){
    this.user = {...user};
  }

  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
     
  }
}
