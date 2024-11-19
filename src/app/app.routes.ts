import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import { RegisterStoreComponent } from './pages/register-store/register-store.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent, pathMatch:"full"},
    {path: 'homelander', component: HomeComponent, pathMatch: "full"},
    {path: 'login',  component: LoginComponent},
    {
        path: 'store', children:[
            {path: 'register', component: RegisterStoreComponent, pathMatch: 'full'}
        ]
    }
];
