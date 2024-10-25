export class User {
    id?: string;
    userName: string | undefined;
    email: string | undefined;
    dob: Date | undefined; 
    gender: string | undefined; // Use Date type for the date of birth
    password: string | undefined;
    securityQuestion: string | undefined;
    securityAnswer: string | undefined;
  }
  