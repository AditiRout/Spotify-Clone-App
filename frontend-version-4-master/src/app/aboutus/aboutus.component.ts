import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  employees = [
    { name: 'Piyush Goswami', code: 'E123', company: 'CGI', designation: 'Software Engineer', phone: '7762004816' },
    { name: 'Gopal Gupta', code: 'E456', company: 'CGI', designation: 'Software Engineer', phone: '7217744003' },
    { name: 'Aditi Rout', code: 'E789', company: 'CGI', designation: 'Software Engineer', phone: '9078485989' },
    { name: 'Sanskriti Singh', code: 'E101', company: 'CGI', designation: 'Assistant Software Engineer', phone: '7300126788' },
    { name: 'Shahid', code: 'E101', company: 'Stackroute', designation: 'Mentor', phone: '654-321-9876' }
  ];
}
