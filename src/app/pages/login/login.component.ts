import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { isEmpty } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule]
})
export class LoginComponent implements AfterViewInit {
  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;

  // Reactive form begin
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  recoverPassForm!: FormGroup;
  // Script para mudar de login -> registro ou recuperar senha
  formType: string = 'login'; // Inicia com o formulário de login
  imageFile!: { link: any; file: any; name: any; };


  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.initiateForm();
  }

  ngOnInit() {
    let user: Object = JSON.parse(localStorage.getItem('user') || '{}')
    if (Object.keys(user).length != 0) {
      this.router.navigate(["/homelander"])
    }
  }

  initiateForm() {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required],
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required],
    });
    this.recoverPassForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
    });
  }

  //depois colocar a lógica certa
  onSubmit() {
    switch (this.formType) {
      case "login":
        this.userService.auth(this.loginForm.value).subscribe({
          next: value => {
            console.log(`Logado com Sucesso!`)
            localStorage.setItem("user", JSON.stringify(value.usuario))
          },
          error: err => console.error("Erro ao Logar: " + err),
          complete: () => {
            this.router.navigate(['/homelander'])
          }
        });
        break;

      case "registerForm":
        const formData = new FormData()
        formData.append('foto', this.imageFile.file )
        Object.keys(this.registerForm.controls).forEach((key) => {
          formData.append(key, this.registerForm.get(key)?.value)
        })
        this.userService.create(this.registerForm.value).subscribe({
          next: (res) => {
            alert("Usuário criado com sucesso!");
            localStorage.setItem("user", JSON.stringify(res.usuario))
          },
          error: (error) => console.log("Erro ao criar usuário: " + error),
          complete: () => {
            this.router.navigate(['/homelander']);
          }
        })
        break;

      case "":
    }
  }

  saveImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // Reactive form ends

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



  toggleForm(type: string) {
    this.formType = type;
  }




}
