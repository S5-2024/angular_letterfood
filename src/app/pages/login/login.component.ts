import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {RegisterService} from '../../services/register.service';
 
import{
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule],
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
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private registerService: RegisterService,

  ) {
    this.initiateForm();
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

  // depois colocar a lógica certa
  // onSubmit() {
  //   if (this.registerForm) {
  //     console.log(this.registerForm.status)
  //     console.log("valido!")
  //   }else{
  //     console.log("invalido!")
  //   }
  // }

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

  // Script para mudar de login -> registro ou recuperar senha
  formType: string = 'login'; // Inicia com o formulário de login

  toggleForm(type: string) {
    this.formType = type;
  }
}
