import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
//import { SignupPhoneComponent } from './signup-phone/signup-phone.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { TrackComponent } from './track/track.component';
import { RegistrationinfoComponent } from './registrationinfo/registrationinfo.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: 'registrationinfo', component: RegistrationinfoComponent},
  { path: 'wishlist', component: WishlistComponent,canActivate: [authGuard]  },
  { path: 'user-profile', component: UserProfileComponent,canActivate: [authGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  {path:'create-password', component:RegisterPasswordComponent},
  {path:'tell-us-about-yourself', component:RegisterInfoComponent},
  {path:'confirmation', component:RegisterConfirmComponent},
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'signup-phone', component: SignupPhoneComponent },
  {path:'about-us', component: AboutusComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:'home-page',component:HomePageComponent,canActivate: [authGuard] },
{path:'search-page',component:SearchPageComponent,canActivate: [authGuard] },
{path:'track/:id',component:TrackComponent,canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
