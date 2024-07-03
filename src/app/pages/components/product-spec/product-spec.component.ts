import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../interface/Product';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-spec',
  standalone: true,
  imports: [AlertFailComponent, AlertSuccessComponent, ReactiveFormsModule],
  templateUrl: './product-spec.component.html',
  styleUrl: './product-spec.component.css',
})
export class ProductSpecComponent {
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  editFormGroup!: FormGroup;

  product!: Product;
  productId = this.router.snapshot.paramMap.get('id');
  ngOnInit() {
    this.productService.getOneProduct(Number(this.productId)).subscribe(
      (response) => {
        this.product = response;
        this.editFormGroup = this.formBuilder.group({
          name: [this.product.name],
          value: [this.product.value],
          quantity: [this.product.quantity],
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleSubmit() {
    this.productService
      .updateProduct({
        id: Number(this.productId),
        name: this.editFormGroup.value.name,
        quantity: this.editFormGroup.value.quantity,
        value: this.editFormGroup.value.value,
      })
      .subscribe(
        (response) => {
          this.product = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
