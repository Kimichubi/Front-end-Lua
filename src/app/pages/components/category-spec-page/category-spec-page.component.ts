import { Component } from '@angular/core';
import { CategoryService } from '../../../service/category/category.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { Observable, switchMap } from 'rxjs';
import { Category } from '../../../interface/Category';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-spec-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    AlertSuccessComponent,
    AlertFailComponent,
    DatePipe,
  ],
  templateUrl: './category-spec-page.component.html',
  styleUrl: './category-spec-page.component.css',
})
export class CategorySpecPageComponent {
  constructor(
    private categoryService: CategoryService,
    private router: ActivatedRoute
  ) {}
  category!: Category;
  page: number = 1;
  categoryId!: number;

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
}
