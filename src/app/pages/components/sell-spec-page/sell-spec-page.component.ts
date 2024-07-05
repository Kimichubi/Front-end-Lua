import { Component, NgModule } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SellsService } from '../../../service/sells/sells.service';
import { response } from 'express';
import { Sell } from '../../../interface/Sells';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../interface/Product';

@Component({
  selector: 'app-sell-spec-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sell-spec-page.component.html',
  styleUrl: './sell-spec-page.component.css',
})
export class SellSpecPageComponent {
  constructor(
    private router: ActivatedRoute,
    private sellService: SellsService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}
  editFormGroup!: FormGroup;

  sell!: Sell;

  products!: Product[];

  addProductGroup: FormGroup = new FormGroup({
    quantity: new FormControl(''),
    product: new FormControl(this.products),
  });

  page = 1;
  paymentMethods = [
    { name: 'cartão-crédito', id: 1 },
    { name: 'cartão-débito', id: 2 },
    { name: 'pix', id: 3 },
    { name: 'dinheiro', id: 4 },
    { name: 'boleto', id: 5 },
  ];

  ngOnInit() {
    const sellId = this.router.snapshot.paramMap.get('id');
    this.sellService.getOneSellById(Number(sellId)).subscribe(
      (response) => {
        this.sell = response;
        this.editFormGroup = new FormGroup({
          dateOfSell: new FormControl(this.sell.dateOfSell),
          dateToInstall: new FormControl(this.sell.dateToInstall),
          isPaid: new FormControl(this.sell.isPaid),
          value: new FormControl(this.sell.value),
          paymentMethods: new FormControl(
            this.paymentMethods.map((pm) => pm.name)
          ),

          quantity: this.fb.array(
            this.sell.sellProducts.map((vl) => this.fb.control(vl.quantity))
          ),
        });

        console.log(this.editFormGroup.value);
      },
      (error) => {
        console.log(error);
      }
    );
    this.productService.getAllProducts(Number(this.page)).subscribe(
      (response) => {
        this.products = response;
        this.addProductGroup = new FormGroup({
          products: new FormControl(this.products),
          quantityProducts: new FormControl(''),
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get quantity() {
    return this.editFormGroup.get('quantity') as FormArray;
  }

  handleAddProduct() {}
  removeProduct(index: number) {}
  handleSubmit() {
    console.log(this.editFormGroup.value);
  }
}
