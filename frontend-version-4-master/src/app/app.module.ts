import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { HttpClientModule } from '@angular/common/http';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarLoginComponent } from './navbar-login/navbar-login.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { TrackComponent } from './track/track.component';
import { MsToMinutesPipe } from './ms-to-minutes.pipe';
import { SearchPageComponent } from './search-page/search-page.component';
import { TruncatePipe } from './truncate.pipe';
import { RegistrationinfoComponent } from './registrationinfo/registrationinfo.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    SignUpComponent,
    
    
    RegisterPasswordComponent,
    RegisterInfoComponent,
    RegisterConfirmComponent,
    SearchPageComponent,
    FooterComponent,
    AboutusComponent,MenuButtonComponent,
    HomeComponent,HomePageComponent,
    NavbarComponent,NavbarLoginComponent, TrackComponent, MsToMinutesPipe, TruncatePipe, RegistrationinfoComponent, WishlistComponent, UserProfileComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Routing configuration
    FormsModule, // Supports two-way data binding with ngModel
    HttpClientModule, BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
