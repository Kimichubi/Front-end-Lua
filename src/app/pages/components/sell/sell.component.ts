import { Component } from '@angular/core';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Sell } from '../../../interface/Sells';
import { SellsService } from '../../../service/sells/sells.service';
import { response } from 'express';
import { Customer } from '../../../interface/Customer';
import { CustomerService } from '../../../service/customer/customer.service';
import { Product } from '../../../interface/Product';
import { ProductService } from '../../../service/product/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [
    AlertSuccessComponent,
    AlertFailComponent,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css',
})
export class SellComponent {
  constructor(
    private sellService: SellsService,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  viewMode: string = 'listar';

  searchQuery: FormControl = new FormControl('');

  sells!: Sell[];

  customers!: Customer[];

  products!: Product[];

  page: number = 1;

  paymentMethods: [{ name: string; id: number }] = [
    { name: 'credit-card', id: 1 },
  ];

  sellFormGroup: FormGroup = new FormGroup({
    dateOfSell: new FormControl(''),
    dateToInstall: new FormControl(''),
    value: new FormControl(''),
    paymentMethod: new FormControl(''),
    customer: new FormControl(''),
    product: new FormControl(''),
  });

  ngOnInit() {
    this.sellService.getSells(this.page).subscribe(
      (response) => {
        this.sells = response;
      },
      (error) => {
        console.log(error);
      }
    );
    this.customerService.getCustomers(this.page).subscribe(
      (response) => {
        this.customers = response;
      },
      (error) => {
        console.log(error);
      }
    );
    this.productService.getAllProducts(this.page).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleGoToSellPage(id: number) {}
  search() {}
  handleSubmit() {
    console.log(this.sellFormGroup.value);
  }
  addProduct() {}
}
