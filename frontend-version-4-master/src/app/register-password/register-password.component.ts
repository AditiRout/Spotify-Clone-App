import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';  // Import the User model

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.css']
})
export class RegisterPasswordComponent {
  passwordForm: FormGroup;
  user: User = new User();  // Create an instance of the User model
  showRequirements: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: [this.user.password, [  // Bind the password field to the User model
        Validators.required,
        Validators.minLength(8), // Minimum length of 8 characters
        this.passwordValidator // Custom validator for password format
      ]]
    });
  }

  passwordValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) return null;
    return null;
  }

  // Method to check if password length is at least 8 characters
  checkLength(): boolean {
    const password = this.passwordForm.get('password')?.value;
    return !!password && password.length >= 8;
  }
  
  checkUppercase(): boolean {
    const password = this.passwordForm.get('password')?.value;
    return !!password && /[A-Z]/.test(password);
  }
  
  checkLowercase(): boolean {
    const password = this.passwordForm.get('password')?.value;
    return !!password && /[a-z]/.test(password);
  }
  
  checkNumber(): boolean {
    const password = this.passwordForm.get('password')?.value;
    return !!password && /[0-9]/.test(password);
  }
  
  checkSpecialChar(): boolean {
    const password = this.passwordForm.get('password')?.value;
    return !!password && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
  

  onInputFocus(): void {
    this.showRequirements = true;
  }

  onInputBlur(): void {
    this.showRequirements = false;
  }

  onNext(): void {
    if (this.passwordForm.valid && this.checkLength()) {
      console.log(this.user);  // Log the user object for debugging
      this.router.navigate(['/tell-us-about-yourself']);
    } else {
      this.showErrorMessage = true; // Show error message if form is invalid
    }
  }
}
