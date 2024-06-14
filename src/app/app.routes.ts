import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/components/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { InfosComponent } from './pages/components/infos/infos.component';
import { CustomerComponent } from './pages/components/customer/customer.component';
import { FinancialComponent } from './pages/components/financial/financial.component';
import { CategoryComponent } from './pages/components/category/category.component';
import path from 'path';
import { CategorySpecPageComponent } from './pages/components/category-spec-page/category-spec-page.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'home', component: HomePageComponent, title: 'Home' },
  { path: 'infos', component: InfosComponent, title: 'Infos' },
  { path: 'customers', component: CustomerComponent, title: 'Customers Page' },
  { path: 'financial', component: FinancialComponent, title: 'Financial Page' },
  { path: 'categorys', component: CategoryComponent, title: 'Categorys Page' },
  {
    path: 'category/:id',
    component: CategorySpecPageComponent,
    title: `Category Page`,
  },
];
