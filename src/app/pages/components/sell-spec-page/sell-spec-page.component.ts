import { Component, NgModule } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SellsService } from '../../../service/sells/sells.service';

import { Sell } from '../../../interface/Sells';
import {
  FormArray,
  FormBuilder,
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
        this.editFormGroup = this.fb.group({
          dateOfSell: [this.sell.dateOfSell],
          dateToInstall: [this.sell.dateToInstall],
          isPaid: [this.sell.isPaid],
          value: [this.sell.value],
          paymentMethod: [this.sell.paymentMethod],
          quantity: this.fb.array(
            this.sell.sellProducts.map((vl) => [vl.quantity])
          ),

          addProductGroup: this.fb.group({
            productId: 0,
            quantityProduct: 0,
          }),
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

  get addProductGroup() {
    return this.editFormGroup.get('addProductGroup') as FormGroup;
  }

  get quantity() {
    return this.editFormGroup.get('quantity') as FormArray;
  }

  handleAddProduct() {
    const sellProductToUpdate = this.sell.sellProducts.filter(
      (vl) => Number(this.addProductGroup.value.productId) === vl.productId
    );
    console.log(sellProductToUpdate);
    if (sellProductToUpdate.length > 0) {
      this.sellService
        .updateSellInfo({
          sellData: { id: Number(this.sell.id) },
          productData: [
            {
              justUpdated: true,
              productId: Number(
                sellProductToUpdate.map((vl) => vl.productId)[0]
              ),
              quantity: Number(
                sellProductToUpdate.map((vl) => vl.quantity)[0] +
                  Number(this.addProductGroup.value.quantityProduct)
              ),
              sellProductId: Number(sellProductToUpdate.map((vl) => vl.id)[0]),
            },
          ],
        })
        .subscribe(
          (response) => {
            this.sell = response;
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      this.sellService
        .updateSellInfo({
          sellData: { id: Number(this.sell.id) },
          productData: [
            {
              justUpdated: false,
              productId: Number(
                sellProductToUpdate.map((vl) => vl.productId)[0]
              ),
              quantity: Number(
                sellProductToUpdate.map((vl) => vl.quantity)[0] +
                  Number(this.addProductGroup.value.quantityProduct)
              ),
            },
          ],
        })
        .subscribe(
          (response) => {
            this.sell = response;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  removeProduct(index: number) {}
  
  handleSubmit() {
    let total = 0;
    this.editFormGroup.value.quantity.forEach((vl: any, index: any) => {
      total += vl * this.sell.products[index].value;
    });

    const sellProductToUpdate = this.sell.sellProducts.filter(
      (vl) => Number(this.addProductGroup.value.productId) === vl.productId
    );
    //@ts-ignore
    const productData: {
      productId: number;
      quantity: number;
      sellProductId: number;
      justUpdated: boolean;
    }[] = [];
    //@ts-ignore

    for (let i = 0; i < this.sell.sellProducts.length; i++) {
      const productId = Number(this.sell.sellProducts[i].productId);
      const quantity = Number(this.editFormGroup.value.quantity[i]);
      const sellProductId = Number(this.sell.sellProducts[i].id);
      const justUpdated = true;

      productData.push({ productId, quantity, sellProductId, justUpdated });
    }

    if (sellProductToUpdate.length > 0) {
      this.sellService
        .updateSellInfo({
          sellData: {
            id: Number(this.sell.id),
            customerId: this.sell.customer.id,
            dateOfSell: this.editFormGroup.value.dateOfSell,
            dateToInstall: this.editFormGroup.value.dateToInstall,
            isPaid: this.editFormGroup.value.isPaid === 'true' ? true : false,
            paymentMethod: this.editFormGroup.value.paymentMethod,
            value: total,
          },
          productData,
        })
        .subscribe(
          (response) => {
            this.sell = response;
            this.ngOnInit();
          },
          (error) => {
            console.error(error);
          }
        );
    } else if (Number(this.addProductGroup.value.productId) === 0) {
      this.sellService
        .updateSellInfo({
          sellData: {
            id: Number(this.sell.id),
            customerId: this.sell.customer.id,
            dateOfSell: this.editFormGroup.value.dateOfSell,
            dateToInstall: this.editFormGroup.value.dateToInstall,
            isPaid: this.editFormGroup.value.isPaid === 'true' ? true : false,
            paymentMethod: this.editFormGroup.value.paymentMethod,
            value: total,
          },
          productData,
        })
        .subscribe(
          (response) => {
            this.sell = response;
            this.ngOnInit();
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      this.sellService
        .updateSellInfo({
          sellData: {
            id: Number(this.sell.id),
            customerId: this.sell.customer.id,
            dateOfSell: this.editFormGroup.value.dateOfSell,
            dateToInstall: this.editFormGroup.value.dateToInstall,
            isPaid: this.editFormGroup.value.isPaid === 'true' ? true : false,
            paymentMethod: this.editFormGroup.value.paymentMethod,
            value: total,
          },
          productData: [
            {
              justUpdated: false,
              productId: Number(
                sellProductToUpdate.map((vl) => vl.productId)[0]
              ),
              quantity: Number(
                sellProductToUpdate.map((vl) => vl.quantity)[0] +
                  Number(this.addProductGroup.value.quantityProduct)
              ),
            },
          ],
        })
        .subscribe(
          (response) => {
            this.sell = response;
            this.ngOnInit();
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
  keyupTest() {
    console.log(this.editFormGroup.value);
  }
}
