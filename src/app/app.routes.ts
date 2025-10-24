import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseslistComponent } from './expenseslist/expenseslist.component';
import { FulldashboardComponent } from './fulldashboard/fulldashboard.component';
import { Categorylist } from './categorylist/categorylist';
import { CategoryEdit } from './categoryEdit/categoryEdit';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'Register',
        component:RegisterComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        children:[
            {
                path:'',
                component:FulldashboardComponent
            },
            {
                path:'dashboard',
                component:FulldashboardComponent
            },
            {
                path:'expenses',
                component:ExpenseslistComponent
            },
            {
                path:'categorys',
                component:Categorylist
            },
            {
                path:'category/:id',
                component:CategoryEdit
            },
            {
                path:'category',
                component:CategoryEdit
            }
        ]
    }
];
