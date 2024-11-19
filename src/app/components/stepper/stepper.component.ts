import { Component } from '@angular/core';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import { NgTemplateOutlet } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'custom-stepper',
  standalone: true,
  imports: [CdkStepperModule, NgTemplateOutlet],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}, BrowserAnimationsModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent extends CdkStepper{
  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}
