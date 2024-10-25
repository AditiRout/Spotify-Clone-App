import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent {
  constructor(private router: Router){}
  onNext(){
    this.router.navigate(['/home']); 
  }
}
