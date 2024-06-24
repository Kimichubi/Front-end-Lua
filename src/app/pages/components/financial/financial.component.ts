import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { FinancialService } from '../../../service/financial/financial.service';
import { Financial } from '../../../interface/Financial';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgClass],
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
}
