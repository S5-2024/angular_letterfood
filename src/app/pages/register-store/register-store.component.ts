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
    /* this.registerForm = this.fb.group({
      
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      cep: new FormControl('', Validators.required),
      rua: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      numero: new FormControl(0, Validators.required),
      categoria: new FormControl([], Validators.required)
    }) */
    this.registerForm = this.fb.group({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      endereco: this.fb.group({
        rua: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        cidade: new FormControl('', Validators.required),
        estado: new FormControl('', Validators.required),
        cep: new FormControl('', Validators.required)
      }),
      telefone: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    })


  }
  /* onSubmit($event: boolean = false) {
    const checkboxes = document.querySelectorAll(".checkbox>input");
    console.log(this.registerForm.value)
    if($event){
      checkboxes.forEach( (checkbox) => {
        if((checkbox as HTMLInputElement).checked){
          let oldValues = this.registerForm.get('categoria')!.value;
          this.registerForm.get('categoria')!.setValue([...oldValues,(checkbox as HTMLInputElement).value]);
        }
      })
    }

}*/
  onSubmit($event: boolean = false) {
    console.log(this.registerForm.value)
    this.restaurantService.createRestaurant(this.registerForm.value).subscribe({
      next: ()=> alert("Restaurante criado com sucesso"),
      error: (err)=> console.error(err),
      complete: ()=>{
        this.router.navigate(['/homelander'])
      }
    })
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
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById("name")).value = this.companyInfo['nome_fantasia'];
        //SETTING THE FORMS CONTROL VALUE
        this.registerForm.controls['nome'].setValue((<HTMLInputElement>document.getElementById("name")).value);
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById("email")).value = this.companyInfo['email'];
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById("phone")).value = this.companyInfo['ddd_telefone_1'];
        //SETTING THE FORMS CONTROL VALUE
        this.registerForm.controls['telefone'].setValue((<HTMLInputElement>document.getElementById("phone")).value);
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById("phone")).value = this.companyInfo['ddd_telefone_1'];
        break;

      case 1:
        const enderecoControl = this.registerForm.get('endereco') as FormGroup;
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById('cep')).value = this.companyInfo['cep'];
        //SETTING THE FORMS CONTROL VALUE
        enderecoControl.controls['cep'].setValue((<HTMLInputElement>document.getElementById('cep')).value);
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById('neighborhood')).value = this.companyInfo['bairro'];
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById('city')).value = this.companyInfo['municipio'];
        //SETTING THE FORMS CONTROL VALUE
        enderecoControl.controls['cidade'].setValue((<HTMLInputElement>document.getElementById('city')).value);
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById('houseNumber')).value = this.companyInfo['numero'];
        //SETTING THE FORMS CONTROL VALUE
        enderecoControl.controls['numero'].setValue((<HTMLInputElement>document.getElementById('houseNumber')).value);
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById('state')).value = this.companyInfo['uf'];
        enderecoControl.controls['estado'].setValue((<HTMLInputElement>document.getElementById('state')).value);
        //SETTING THE INPUT VALUE
        (<HTMLInputElement>document.getElementById('street')).value = this.companyInfo['logradouro'];
        //SETTING THE FORMS CONTROL VALUE
        enderecoControl.controls['rua'].setValue((<HTMLInputElement>document.getElementById('street')).value);
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
