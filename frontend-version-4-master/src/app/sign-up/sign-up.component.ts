import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model'; // Import the User model
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  user: User = new User(); // Create an instance of the User model

  constructor(private fb: FormBuilder, private router : Router) {
    // Initialize the form with form controls and validations
    this.signUpForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]] // Bind email to the User model
    });
  }

  onNext(): void {
    if (this.signUpForm.valid) {
      console.log(this.user);  // You can check the user object here
      // Navigate to the create-password component
      this.router.navigate(['/create-password']);
    } else {
      this.signUpForm.markAllAsTouched();  // Mark all fields to show validation errors
    }
  }
  
}
