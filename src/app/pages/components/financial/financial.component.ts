import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { FinancialService } from '../../../service/financial/financial.service';
import { Financial } from '../../../interface/Financial';
import { NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgClass,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.css',
  providers: [FinancialService],
})
export class FinancialComponent {
  constructor(
    private financialService: FinancialService,
    private router: Router
  ) {}
  financials!: Financial[];

  newFinancialForm = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    dateToPay: new FormControl('', Validators.required),
    isPaid: new FormControl('', Validators.required),
    isFixed: new FormControl('', Validators.required),
  });

  showNewFinancialForm: boolean = false;
  page: number = 1;
  ngOnInit() {
    this.financialService.getFinancial(this.page).subscribe(
      (response) => {
        this.financials = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleLinkFinancial(id: number) {
    this.router.navigate([`financial/${id}`]);
  }

  createFinancial() {
    if (this.newFinancialForm.value.isPaid === 'true') {
      //@ts-ignore
      this.newFinancialForm.value.isPaid = true;
    } else if (this.newFinancialForm.value.isPaid === 'false') {
      //@ts-ignore
      this.newFinancialForm.value.isPaid = false;
    }
    if (this.newFinancialForm.value.isFixed === 'true') {
      //@ts-ignore
      this.newFinancialForm.value.isFixed = true;
    } else if (this.newFinancialForm.value.isFixed === 'false') {
      //@ts-ignore
      this.newFinancialForm.value.isFixed = false;
    }

    this.financialService
      .create({
        name: this.newFinancialForm.value.name!,
        date: this.newFinancialForm.value.date!,
        dateToPay: this.newFinancialForm.value.dateToPay!,
        //@ts-ignore
        isFixed: this.newFinancialForm.value.isFixed!,
        //@ts-ignore
        isPaid: this.newFinancialForm.value.isPaid!,
        value: Number(this.newFinancialForm.value.value),
      })
      .subscribe((response) => {});
  }
  toggleNewFinancialForm() {
    this.showNewFinancialForm = !this.showNewFinancialForm;
  }
}
