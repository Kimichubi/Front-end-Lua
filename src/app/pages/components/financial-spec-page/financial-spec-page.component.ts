import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { Financial } from '../../../interface/Financial';
import { FinancialService } from '../../../service/financial/financial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-financial-spec-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    AlertSuccessComponent,
    AlertFailComponent,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './financial-spec-page.component.html',
  styleUrl: './financial-spec-page.component.css',
})
export class FinancialSpecPageComponent {
  constructor(
    private financialService: FinancialService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  editFormGroup!: FormGroup;

  financial!: Financial;
  financialId = this.router.snapshot.paramMap.get('id');

  ngOnInit() {
    this.financialService.getOneFinancial(Number(this.financialId)).subscribe(
      (response) => {
        this.financial = response;
        this.editFormGroup = this.formBuilder.group({
          name: [this.financial.name],
          dateToPay: [this.financial.dateToPay],
          value: [this.financial.value],
          isPaid: [this.financial.isPaid],
          isFixed: [this.financial.isFixed],
          date: [this.financial.date],
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleSubmit() {
    if (this.editFormGroup.value.isPaid === 'true') {
      this.editFormGroup.value.isPaid = true;
    } else if (this.editFormGroup.value.isPaid === 'false') {
      this.editFormGroup.value.isPaid = false;
    }
    if (this.editFormGroup.value.isFixed === 'true') {
      this.editFormGroup.value.isFixed = true;
    } else if (this.editFormGroup.value.isFixed === 'false') {
      this.editFormGroup.value.isFixed = false;
    }

    this.financialService
      .updateFinancial({
        id: Number(this.financialId),
        name: this.editFormGroup.value.name,
        dateToPay: this.editFormGroup.value.dateToPay,
        isFixed: this.editFormGroup.value.isFixed,
        isPaid: this.editFormGroup.value.isPaid,
        value: Number(this.editFormGroup.value.value),
        date: this.editFormGroup.value.date,
      })
      .subscribe(
        (response) => {

          this.financial = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
