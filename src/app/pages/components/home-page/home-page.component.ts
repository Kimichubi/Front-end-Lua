import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../interface/User';
import { UserService } from '../../../service/user/user.service';
import { Financial } from '../../../interface/Financial';
import { FinancialService } from '../../../service/financial/financial.service';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../../../service/customer/customer.service';
import { Customer } from '../../../interface/Customer';
import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../interface/Product';
import { SellsService } from '../../../service/sells/sells.service';
import { Sell } from '../../../interface/Sells';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DatePipe, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [UserService, FinancialService],
})
export class HomePageComponent {
  constructor(
    private navigation: Router,
    private userService: UserService,
    private financialService: FinancialService,
    private customerService: CustomerService,
    private productService: ProductService,
    private sellService: SellsService
  ) {}

  user!: User;

  financials!: Financial[];
  filteredFinancials!: Financial[];

  date: Date = new Date(Date.now());
  monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  month: string = this.monthNames[this.date.getMonth()];
  day: number = this.date.getDate();
  year: number = this.date.getFullYear();
  page: number = 1;

  customersToChange!: Customer[];
  customers!: Customer[];

  products!: Product[];
  remainingProducts!: Product[];

  sells!: Sell[];
  todaySells!: Sell[];

  ngOnInit() {
    this.userService.infos().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.error(error);
      }
    );
    this.financialService.getFinancial(this.page).subscribe(
      (response) => {
        this.financials = response;
        this.filteredFinancials = this.financials.filter(
          (financial) => !financial.isPaid
        );
      },
      (error) => {
        console.error(error);
      }
    );
    this.customerService.getCustomers(this.page).subscribe(
      (response) => {
        this.getCustomersToChange(response);
      },
      (error) => {
        console.error(error);
      }
    );
    this.productService.getAllProducts(this.page).subscribe(
      (response) => {
        this.products = response;
        this.remainingProducts = response.filter(
          (product) => product.quantity < 5
        );
      },
      (error) => {
        console.error(error);
      }
    );
    this.sellService.getSells(this.page).subscribe(
      (response) => {
        this.sells = response;

        this.todaySells = response.filter(
          (sell) =>
            sell.dateToInstall === `${this.day}/${this.date.getMonth() + 1}` ||
            sell.dateToInstall === `${this.day}/0${this.date.getMonth() + 1}`
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCustomersToChange(customer: Customer[]): void {
    let monthNumber: any = this.date.getMonth() + 1;

    if (monthNumber < 10) {
      monthNumber = '0' + monthNumber;
    }

    this.customersToChange = customer.filter(
      (customer) =>
        customer.dateToChange ===
        `${this.day.toString()}/${monthNumber.toString()}/${this.year.toString()}`
    );
  }
  handleClient(id: number) {
    this.navigation.navigate([`/customer/${id}`]);
  }
  handleProduct(id: number) {
    this.navigation.navigate([`/product/${id}`]);
  }
}
