import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';

export const routes: Routes = [
    {path: "", component: HomeComponent, pathMatch: "full"},
    {path: 'login',  component: LoginComponent},
    {path: 'homelander', component: LandingPageComponent, pathMatch:"full"}
];
