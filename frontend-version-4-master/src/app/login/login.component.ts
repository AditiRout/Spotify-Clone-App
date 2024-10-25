import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { UserService } from '../user.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
 
  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) {}
 
  login(): void {
    if (this.email && this.password) {
      this.userService.login(this.email, this.password).subscribe(
        res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId",res.userId);
          console.log(res);
          this.openSnackBar('Login successful', 'Close');
          this.router.navigate(['/home-page']);
        },
        err => {
          console.error(err);
          this.openSnackBar('Invalid login credentials', 'Close');
        }
      );
    } else {
      this.openSnackBar('Please enter valid credentials', 'Close');
    }
    this.userService.getUserByToken().subscribe(
      res => console.log("user", res),
      err => console.error(err)
    );
  }
 
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],  // Add custom class for styling
    });
  }
}