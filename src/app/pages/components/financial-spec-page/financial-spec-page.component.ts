import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { AlertSuccessComponent } from '../../common/alert-success/alert-success.component';
import { AlertFailComponent } from '../../common/alert-fail/alert-fail.component';
import { Financial } from '../../../interface/Financial';
import { FinancialService } from '../../../service/financial/financial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-financial-spec-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    AlertSuccessComponent,
    AlertFailComponent,
  ],
  templateUrl: './financial-spec-page.component.html',
  styleUrl: './financial-spec-page.component.css',
})
export class FinancialSpecPageComponent {
  constructor(
    private financialService: FinancialService,
    private router: ActivatedRoute
  ) {}

  financial!: Financial;

  ngOnInit() {
    const financialId = this.router.snapshot.paramMap.get('id');
    this.financialService.getOneFinancial(Number(financialId)).subscribe(
      (response) => {
        this.financial = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
