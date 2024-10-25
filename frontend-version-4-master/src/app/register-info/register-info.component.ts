import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';  // Import the User model

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent {
  registerForm: FormGroup;
  user: User = new User();  // Create an instance of the User model

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      userName: [this.user.userName, [Validators.required, Validators.minLength(4)]],  // Bind name to User model
      dob: [this.user.dob, Validators.required],  // Bind dob to User model
      gender: [this.user.gender, Validators.required],  // Bind gender to User model
      securityQuestion: [this.user.securityQuestion, Validators.required],  // Bind securityQuestion to User model
      securityAnswer: [this.user.securityAnswer, Validators.required]  // Bind securityAnswer to User model
    });
  }

  onNext(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);  // Log the form data for debugging
      this.router.navigate(['/confirmation']);  // Navigate to the confirmation page
    } else {
      this.registerForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
    }
  }
}
