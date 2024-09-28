import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentForm: FormGroup;
  cart = []; // Placeholder for useSelector equivalent

  constructor(private fb: FormBuilder) {
    // Initializing the form with validators
    this.paymentForm = this.fb.group({
      userNum: ['', [Validators.required, Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)]],
      userName: ['', [Validators.required, Validators.pattern(/([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1}[A-Z]{1,30}[- ]{0,1}|[A-Z]{1,2}[ -\']{1}[A-Z]{1}[A-Z]{1,30}){2,5}/)]],
      userDate: ['', [Validators.required, Validators.pattern(/\d{2}\/\d{2}$/)]],
      userCVV: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value); // Handle valid form submission
    } else {
      console.log('Form is invalid');
    }
  }

  // Getter methods to access form controls in the template
  get userNum() {
    return this.paymentForm.get('userNum');
  }

  get userName() {
    return this.paymentForm.get('userName');
  }

  get userDate() {
    return this.paymentForm.get('userDate');
  }

  get userCVV() {
    return this.paymentForm.get('userCVV');
  }
}
