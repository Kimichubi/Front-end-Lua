import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer/customer.service';
import { Customer } from '../../../interface/Customer';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../interface/Product';
import { ProductService } from '../../../service/product/product.service';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    AlertSuccessComponent,
    AlertFailComponent,
  ],

  providers: [CustomerService],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private navigation: Router
  ) {}

  openAlertSuccess: boolean = false;
  openAlertFail: boolean = false;
  textSuccess: string = '';
  textFail: string = '';
  customers!: Customer[];
  viewMode: string = 'listar';
  page: number = 1;
  products!: Product[];
  customerFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    dateToChange: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
  });
  searchQuery = new FormControl('');

  ngOnInit() {
    this.customerService.getCustomers(this.page).subscribe(
      (response) => {
        this.customers = response;
      },
      (error) => {
        console.error(error);
      }
    );
    this.productService.getAllProducts(this.page).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleSubmit() {
    this.customerService
      .creatNewCustomer({
        name: this.customerFormGroup.value.name!,
        address: this.customerFormGroup.value.address!,
        phone: this.customerFormGroup.value.phone!,
        dateToChange: this.customerFormGroup.value.dateToChange!,
        products: {
          connect: [{ id: Number(this.customerFormGroup.value.product) }],
        },
      })
      .subscribe(
        (response) => {
          this.openAlertSuccess = true;
          this.textSuccess = 'Sucesso cliente criado!';
          setTimeout(() => {
            this.openAlertSuccess = true;
            this.textSuccess = '';
          }, 1000 * 3);
        },
        (error) => {
          this.openAlertFail = true;
          this.textFail = 'Falha cliente não foi criado!';
          setTimeout(() => {
            this.openAlertFail = true;
            this.textFail = '';
          }, 1000 * 3);
        }
      );
  }
  handleGoToClientPage(id: number) {
    this.navigation.navigate([`customer/${id}`]);
  }

  search() {
    if (this.searchQuery.value! == '') {
      this.customerService.getCustomers(1).subscribe(
        (response) => {
          this.customers = response;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.customerService
      .searchCustomer(this.page, this.searchQuery.value!)
      .subscribe(
        (response) => {
          this.customers = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
