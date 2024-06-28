import { Component } from '@angular/core';
import { CategoryService } from '../../../service/category/category.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { Observable, switchMap } from 'rxjs';
import { Category } from '../../../interface/Category';
import { DatePipe, NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../interface/Product';
import { ProductService } from '../../../service/product/product.service';

@Component({
  selector: 'app-category-spec-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    AlertSuccessComponent,
    AlertFailComponent,
    DatePipe,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './category-spec-page.component.html',
  styleUrl: './category-spec-page.component.css',
})
export class CategorySpecPageComponent {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: ActivatedRoute,
    private navigation: Router
  ) {}

  viewMode: string = 'listar';
  category!: Category;
  page: number = 1;
  categoryId!: number;

  newProductFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  openAlertSuccess: boolean = false;
  openAlertFail: boolean = false;
  textSuccess: string = '';
  textFail: string = '';

  ngOnInit() {
    this.categoryId = Number(this.router.snapshot.paramMap.get('id'));
    this.categoryService
      .getOneCategoryById(this.categoryId, this.page)
      .subscribe(
        (response) => {
          this.category = response;
          console.log(this.category);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleSubmit() {
    this.productService
      .newProduct({
        name: this.newProductFormGroup.value.name!,
        quantity: Number(this.newProductFormGroup.value.quantity),
        value: Number(this.newProductFormGroup.value.value),
        category: { connect: { id: this.categoryId } },
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.openAlertSuccess = true;
          this.textSuccess = 'Sucesso Produto criado!';
          setTimeout(() => {
            this.openAlertSuccess = false;
            this.textSuccess = '';
          }, 1000 * 3);
        },
        (error) => {
          console.log(error);
          this.openAlertFail = true;
          this.textFail = 'Error Produto não foi criado!';
          setTimeout(() => {
            this.openAlertFail = false;
            this.textFail = '';
          }, 1000 * 3);
        }
      );
  }
  handleRouteProduct(id: number) {
    this.navigation.navigate([`product/${id}`]);
  }
}
