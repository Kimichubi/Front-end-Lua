import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

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
export class SellComponent implements OnInit {
  constructor(
    private sellService: SellsService,
    private customerService: CustomerService,
    private productService: ProductService,
    private navigation: Router
  ) {}

  viewMode: string = 'listar';

  searchQuery: FormControl = new FormControl('');

  sells!: Sell[];

  customers!: Customer[];

  products!: Product[];

  page: number = 1;

  paymentMethods = [
    { name: 'cartão-crédito', id: 1 },
    { name: 'cartão-débito', id: 2 },
    { name: 'pix', id: 3 },
    { name: 'dinheiro', id: 4 },
    { name: 'boleto', id: 5 },
  ];

  sellFormGroup: FormGroup = new FormGroup({
    dateOfSell: new FormControl(''),
    dateToInstall: new FormControl(''),
    value: new FormControl(''),
    paymentMethod: new FormControl(''),
    customer: new FormControl(''),
  });

  productsFormGroup: FormGroup = new FormGroup({
    products: new FormControl(['']),
    quantity: new FormControl(''),
  });

  productsFormArray: Product[] = [];

  productChosed!: Product;

  quantityInput = new FormControl('');

  quantityChosed: number[] = [];

  produtctAndQuantity: number[] = [];

  productTotalValue: number = 0;

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

  handleGoToSellPage(id: number) {
    this.navigation.navigate([`sell/${id}`]);
  }
  search() {}
  handleSubmit() {
    //@ts-ignore
    const productData: [{ productId: number; quantity: number }] = [];
    //@ts-ignore
    const products: [{ connect: { id: number } }] = [];

    for (let i = 0; i < this.productsFormArray.length; i++) {
      const productId = this.productsFormArray[i].id;
      const quantity = this.quantityChosed[i];

      products.push({ connect: { id: this.productsFormArray[i].id } });

      productData.push({ productId, quantity });
    }

    console.log(
      this.sellFormGroup.value.dateOfSell!,
      this.sellFormGroup.value.dateToInstall!,
      Number(this.productTotalValue!),
      this.sellFormGroup.value.paymentMethod!,
      Number(this.sellFormGroup.value.customer!),
      products,
      productData
    );

    this.sellService
      .creatNewSell({
        sellData: {
          dateOfSell: this.sellFormGroup.value.dateOfSell!,
          dateToInstall: this.sellFormGroup.value.dateToInstall!,
          value: Number(this.productTotalValue!),
          paymentMethod:
            this.paymentMethods[this.sellFormGroup.value.paymentMethod].name!,
          customer: {
            connect: { id: Number(this.sellFormGroup.value.customer!) },
          },
        },
        productData,
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  addProduct() {
    this.quantityChosed.push(this.productsFormGroup.value.quantity);

    this.productService
      .getOneProduct(Number(this.productsFormGroup.value.products!))
      .subscribe((response) => {
        this.productChosed = response;
        this.productsFormArray.push(this.productChosed);
        this.produtctAndQuantity.push(
          Number(this.productsFormGroup.value.quantity) * response.value
        );

        this.productTotalValue = this.produtctAndQuantity.reduce(
          (pv, cr) => cr + pv
        );
      });
  }

  acessProduct(id: number) {
    this.navigation.navigate([`product/${id}`]);
  }
  attQuantity(event: any, index: number) {
    this.quantityChosed[index] = Number(this.quantityInput.value);
    this.produtctAndQuantity[index] =
      this.productsFormArray[index].value * Number(this.quantityChosed[index]);
    this.productTotalValue = this.produtctAndQuantity.reduce(
      (pv, cr) => cr + pv
    );
  }
  deleteSell(id: number) {
    this.sellService.deleteSell({ id }).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
