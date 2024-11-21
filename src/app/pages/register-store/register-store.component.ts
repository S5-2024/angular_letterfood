import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { CdkStepper, CdkStepperModule, StepperSelectionEvent } from '@angular/cdk/stepper';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { GeneralApiService } from '../../services/general-api.service';

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
  private companyInfo: any = null;

  constructor(private el: ElementRef, private renderer: Renderer2,
    private fb: FormBuilder, private generalApi: GeneralApiService) { }


  ngOnInit() {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      cnpj: new FormControl('', [Validators.required, Validators.maxLength(14)]),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      cep: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required)
    })
  }
  onSubmit() {
    const checkboxes = document.querySelectorAll("#checkbox-container>input")
  }

  onStepChange($event: StepperSelectionEvent) {
    this.configureInputs($event.selectedIndex)
  }

  checkCNPJ() {
    const cnpj = (<HTMLInputElement>document.getElementById("cnpj")).value.replace("-", "")
      .replace("/", "").replace(".", "")

    this.generalApi.fetchCnpjInfo(cnpj).subscribe((data) => {
      this.companyInfo = data
      this.configureInputs()
    })

  }

  configureInputs(stepIndex: number = 0) {
    console.log(this.companyInfo)
    switch (stepIndex) {
      case 0:
        this.registerForm.controls['cnpj'].setValue((<HTMLInputElement>document.getElementById("cnpj")).value);
        //define email
        this.registerForm.controls['email'].setValue((<HTMLInputElement>document.getElementById("email")).value);
        //define Name
        (<HTMLInputElement>document.getElementById("name")).value = this.companyInfo['nome_fantasia'];
        this.registerForm.controls['name'].setValue((<HTMLInputElement>document.getElementById("name")).value);
        //define phone
        (<HTMLInputElement>document.getElementById("phone")).value = this.companyInfo['ddd_telefone_1'];
        this.registerForm.controls['phone'].setValue((<HTMLInputElement>document.getElementById("phone")).value);
        break;

      case 1:
        //define cep
        (<HTMLInputElement>document.getElementById('cep')).value = this.companyInfo['cep'];
        (<HTMLInputElement>document.getElementById('street')).value = this.companyInfo['logradouro'];
        (<HTMLInputElement>document.getElementById('neighborhood')).value = this.companyInfo['bairro'];
        (<HTMLInputElement>document.getElementById('city')).value = this.companyInfo['municipio'];
        (<HTMLInputElement>document.getElementById('state')).value = this.companyInfo['uf'];
        (<HTMLInputElement>document.getElementById('houseNumber')).value = this.companyInfo['numero'];
        this.registerForm.get('cep')?.setValue((<HTMLInputElement>document.getElementById('cep')).value);
        this.registerForm.get('street')?.setValue((<HTMLInputElement>document.getElementById('street')).value);
        this.registerForm.get('neighborhood')?.setValue((<HTMLInputElement>document.getElementById('neighborhood')).value);
        this.registerForm.get('city')?.setValue((<HTMLInputElement>document.getElementById('city')).value);
        this.registerForm.get('state')?.setValue((<HTMLInputElement>document.getElementById('state')).value);
        this.registerForm.get('houseNumber')?.setValue((<HTMLInputElement>document.getElementById('houseNumber')).value);
    }


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
