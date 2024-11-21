import { Component, EventEmitter, Output } from '@angular/core';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'custom-stepper',
  standalone: true,
  imports: [CdkStepperModule, NgTemplateOutlet, CommonModule],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}, BrowserAnimationsModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent extends CdkStepper{
  @Output() submitEvent = new EventEmitter<boolean>()

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }

  checkIfSubmit($event: Event){
    console.log(($event.target as HTMLInputElement).innerHTML)
    if(($event.target as HTMLInputElement).innerHTML.trim() == "Send"){
      this.sendSubmitEvent()
    }
  }
  
  sendSubmitEvent(){
    this.submitEvent.emit(true)
  }

}

