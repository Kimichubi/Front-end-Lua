import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomePageComponent } from './pages/components/home-page/home-page.component';
import { InfosComponent } from './pages/components/infos/infos.component';
import { CustomerComponent } from './pages/components/customer/customer.component';
import { FinancialComponent } from './pages/components/financial/financial.component';
import { CategoryComponent } from './pages/components/category/category.component';
import { CategorySpecPageComponent } from './pages/components/category-spec-page/category-spec-page.component';
import { CustomerSpecPageComponent } from './pages/components/customer-spec-page/customer-spec-page.component';
import { FinancialSpecPageComponent } from './pages/components/financial-spec-page/financial-spec-page.component';
import { ProductSpecComponent } from './pages/components/product-spec/product-spec.component';
import { LayoutAppComponent } from './pages/components/layout-app/layout-app.component';
import { SellComponent } from './pages/components/sell/sell.component';
import { SellSpecPageComponent } from './pages/components/sell-spec-page/sell-spec-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
    children: [],
  },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: '',
    component: LayoutAppComponent,
    children: [
      { path: 'home', component: HomePageComponent, title: 'Home' },
      { path: 'infos', component: InfosComponent, title: 'Infos' },
      {
        path: 'customers',
        component: CustomerComponent,
        title: 'Customers Page',
      },
      {
        path: 'financial',
        component: FinancialComponent,
        title: 'Financial Page',
      },
      {
        path: 'categorys',
        component: CategoryComponent,
        title: 'Categorys Page',
      },
      {
        path: 'category/:id',
        component: CategorySpecPageComponent,
        title: `Category Page`,
      },
      {
        path: 'customer/:id',
        component: CustomerSpecPageComponent,
        title: `Customer Page`,
      },
      {
        path: 'financial/:id',
        component: FinancialSpecPageComponent,
        title: `Financial Page`,
      },
      {
        path: 'product/:id',
        component: ProductSpecComponent,
        title: `Product Page`,
      },
      {
        path: 'sells',
        component: SellComponent,
        title: `Sell Page`,
      },
      {
        path: 'sell/:id',
        component: SellSpecPageComponent,
        title: `Sell Page`,
      },
    ],
  },
];
