import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { CategoryService } from '../../../service/category/category.service';
import { Category } from '../../../interface/Category';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    AlertSuccessComponent,
    AlertFailComponent,
  ],
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private navigation: Router
  ) {}
  categoryFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  openAlertSuccess: boolean = false;
  openAlertFail: boolean = false;
  textSuccess: string = '';
  textFail: string = '';
  categorys!: Category[];
  viewMode: string = 'listar';
  page: number = 1;
  ngOnInit() {
    this.categoryService.getAllCategorys(this.page).subscribe(
      (response) => {
        this.categorys = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  handleSubmit() {
    this.categoryService
      .createCategory(this.categoryFormGroup.value.name!)
      .subscribe(
        (response) => {
          this.openAlertSuccess = true;
          this.textSuccess = 'Sucesso categoria criada!';
          setTimeout(() => {
            this.openAlertSuccess = false;
            this.textSuccess = '';
          }, 1000 * 3);
        },
        (error) => {
          console.log(error);
          this.openAlertFail = true;
          this.textFail = 'Algo deu errado por favor tente novamente!';
          setTimeout(() => {
            this.openAlertSuccess = false;
            this.textFail = '';
          }, 1000 * 3);
        }
      );
  }
  handleDelete(id: number) {
    this.categoryService.deleteCategory(id).subscribe(
      (response) => {
        this.categorys = this.categorys.filter((vl) => vl.id !== response.id);
      },
      (error) => {
        console.log(error);
        this.openAlertFail = true;
        this.textFail = 'Algo deu errado por favor tente novamente!';
        setTimeout(() => {
          this.openAlertSuccess = false;
          this.textFail = '';
        }, 1000 * 3);
      }
    );
  }
  handleAcess(id: number) {
    this.navigation.navigate([`category/${id}`]);
  }
}
