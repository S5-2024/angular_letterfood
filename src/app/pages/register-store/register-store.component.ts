import { Component, ElementRef, Renderer2 } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { CdkStepper, CdkStepperModule, StepperSelectionEvent} from '@angular/cdk/stepper';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register-store',
  standalone: true,
  imports: [StepperComponent, CdkStepperModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-store.component.html',
  styleUrl: './register-store.component.css',
  providers: [BrowserAnimationsModule],
  animations: [
    trigger('stepAnimation', [
      state('current', style({ opacity: 1, transform: 'translateX(0)' })),
      state('inactive', style({ opacity: 0, transform: 'translateX(100%)' })),
      transition('inactive => current', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out')
      ]),
      transition('current => inactive', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
  
})
export class RegisterStoreComponent {
  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;
  protected registerForm !: FormGroup
  constructor(private el: ElementRef, private renderer: Renderer2, private fb: FormBuilder) {}


  ngOnInit(){
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      cnpj: new FormControl('', [Validators.required, Validators.maxLength(14)])
    })
  }
  onSubmit(){
    const checkboxes = document.querySelectorAll("#checkbox-container>input")
  }







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
}
