import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar
import { User } from '../user.model';
import { UserService } from '../user.service';
 
@Component({
  selector: 'app-registrationinfo',
  templateUrl: './registrationinfo.component.html',
  styleUrls: ['./registrationinfo.component.css']
})
export class RegistrationinfoComponent {
  registerForm: FormGroup;
  user: User = new User();  
  showRequirements = false;
  showErrorMessage = false;
 
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private userService: UserService,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]], 
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator  
      ]],
      userName: [this.user.userName, [Validators.required, Validators.minLength(4)]],
      dob: [this.user.dob, Validators.required], 
      gender: [this.user.gender, Validators.required],  
      securityQuestion: [this.user.securityQuestion, Validators.required],  
      securityAnswer: [this.user.securityAnswer, Validators.required]  
    });
  }
 
  passwordValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
 
    if (!password) {
      return null;
    }
 
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
 
    const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    return isValid ? null : { invalidPassword: true };
  }
 
  onInputFocus(): void {
    this.showRequirements = true;
  }
 
  onInputBlur(): void {
    this.showRequirements = false;
  }
 
  checkLength(): boolean {
    const password = this.registerForm.get('password')?.value;
    return password && password.length >= 8;
  }
 
  checkUppercase(): boolean {
    const password = this.registerForm.get('password')?.value;
    return /[A-Z]/.test(password);
  }
 
  checkLowercase(): boolean {
    const password = this.registerForm.get('password')?.value;
    return /[a-z]/.test(password);
  }
 
  checkNumber(): boolean {
    const password = this.registerForm.get('password')?.value;
    return /[0-9]/.test(password);
  }
 
  checkSpecialChar(): boolean {
    const password = this.registerForm.get('password')?.value;
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
 
  onNext(): void {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      console.log(this.user); 
      this.userService.addUser(this.user).subscribe(
        res => {
          this.openSnackBar('Registration successful!', 'Close');  // Show success Snackbar
          this.router.navigate(['/confirmation']);  
        },
        err => {
          console.error(err);
          this.openSnackBar('Registration failed. Please try again.', 'Close');  // Show error Snackbar
        }
      );
    } else {
      this.registerForm.markAllAsTouched();  
    }
  }
 
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']  // Add custom class for styling
    });
  }
}