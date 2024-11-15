import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent, pathMatch:"full"},
    {path: 'homelander', component: HomeComponent, pathMatch: "full"},
    {path: 'login',  component: LoginComponent},
    {path: 'profile',  component: ProfileComponent}
];
