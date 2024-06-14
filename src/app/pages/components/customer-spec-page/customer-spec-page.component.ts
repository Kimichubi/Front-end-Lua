import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../../service/customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../interface/Customer';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../interface/Product';

@Component({
  selector: 'app-customer-spec-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    AlertFailComponent,
    AlertSuccessComponent,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './customer-spec-page.component.html',
  styleUrl: './customer-spec-page.component.css',
})
export class CustomerSpecPageComponent {
  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private navigate: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  editFormGroup!: FormGroup;
  addProductGroup = new FormGroup({ product: new FormControl('') });

  openAlertSuccess: boolean = false;
  openAlertFail: boolean = false;
  textSuccess: string = '';
  textFail: string = '';

  customer!: Customer;
  products!: Product[];
  page = 1;

  ngOnInit() {
    const customerId = this.router.snapshot.paramMap.get('id');
    this.customerService.getOneCustomerById(Number(customerId)).subscribe(
      (response) => {
        this.customer = response;
        this.editFormGroup = this.formBuilder.group({
          name: [this.customer.name],
          address: [this.customer.address],
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.productService.getAllProducts(Number(this.page)).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleSubmit() {
    this.customerService
      .updatedCustomerInfos({
        id: this.customer.id,
        name: this.editFormGroup.value.name,
        address: this.editFormGroup.value.address,
      })
      .subscribe(
        (response) => {
          this.customer = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  handleAddProduct() {
    this.customerService
      .updatedCustomerInfos({
        id: this.customer.id,
        name: this.editFormGroup.value.name,
        address: this.editFormGroup.value.address,
        products: {
          connect: { id: Number(this.addProductGroup.value.product) },
        },
      })
      .subscribe(
        (response) => {
          this.customer = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
