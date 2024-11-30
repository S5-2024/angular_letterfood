import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { CdkStepper, CdkStepperModule, StepperSelectionEvent } from '@angular/cdk/stepper';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { GeneralApiService } from '../../services/general-api.service';
import { RestaurantsService } from '../../services/restaurants.service';
import { Router } from '@angular/router';

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
    private fb: FormBuilder, private generalApi: GeneralApiService,
    private restaurantService: RestaurantsService, private router: Router) { }


  ngOnInit() {
    this.registerForm = this.fb.group({
      cnpj: new FormControl('', [Validators.required, Validators.maxLength(14)]),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      cep: new FormControl('', Validators.required),
      rua: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      numero: new FormControl(0, Validators.required),
      categoria: new FormControl([], Validators.required)
    })
  }
  onSubmit($event: boolean = false) {
    const checkboxes = document.querySelectorAll(".checkbox>input");
    console.log(this.registerForm.value)
    if($event){
      checkboxes.forEach( (checkbox) => {
        if((checkbox as HTMLInputElement).checked){
          let oldValues = this.registerForm.get('categoria')!.value;
          this.registerForm.get('categoria')!.setValue([...oldValues,(checkbox as HTMLInputElement).value]);
        }
      })
      this.restaurantService.create(this.registerForm.value).subscribe({
        next: () => console.log("Restaurante Criado com sucesso"),
        error: (err) => console.error("Erro ao criar restaurante\n" + err),
        complete: () => {
          this.router.navigate(["/homelander"])
        }
      });
    }

    
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
        console.log((<HTMLInputElement>document.getElementById("email")).value)
        this.registerForm.controls['cnpj'].setValue((<HTMLInputElement>document.getElementById("cnpj")).value);
        (<HTMLInputElement>document.getElementById("email")).value = this.companyInfo['email']
        this.registerForm.controls['email'].setValue((<HTMLInputElement>document.getElementById("email")).value);
        (<HTMLInputElement>document.getElementById("name")).value = this.companyInfo['nome_fantasia'];
        /* this.registerForm.controls['name'].setValue((<HTMLInputElement>document.getElementById("name")).value); */
        (<HTMLInputElement>document.getElementById("phone")).value = this.companyInfo['ddd_telefone_1'];
        this.registerForm.controls['telefone'].setValue((<HTMLInputElement>document.getElementById("phone")).value);
        
        break;

      case 1:
        //define cep
        this.registerForm.controls['email'].setValue((<HTMLInputElement>document.getElementById("email")).value);
        (<HTMLInputElement>document.getElementById('cep')).value = this.companyInfo['cep'];
        (<HTMLInputElement>document.getElementById('street')).value = this.companyInfo['logradouro'];
        (<HTMLInputElement>document.getElementById('neighborhood')).value = this.companyInfo['bairro'];
        (<HTMLInputElement>document.getElementById('city')).value = this.companyInfo['municipio'];
        (<HTMLInputElement>document.getElementById('state')).value = this.companyInfo['uf'];
        (<HTMLInputElement>document.getElementById('houseNumber')).value = this.companyInfo['numero'];
        this.registerForm.get('cep')?.setValue((<HTMLInputElement>document.getElementById('cep')).value);
        this.registerForm.get('rua')?.setValue((<HTMLInputElement>document.getElementById('street')).value);
        this.registerForm.get('bairro')?.setValue((<HTMLInputElement>document.getElementById('neighborhood')).value);
        this.registerForm.get('cidade')?.setValue((<HTMLInputElement>document.getElementById('city')).value);
        this.registerForm.get('estado')?.setValue((<HTMLInputElement>document.getElementById('state')).value);
        this.registerForm.get('numero')?.setValue(parseInt((<HTMLInputElement>document.getElementById('houseNumber')).value));
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
