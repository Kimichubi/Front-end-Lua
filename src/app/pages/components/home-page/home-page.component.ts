import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { Router } from '@angular/router';
import { User } from '../../../interface/User';
import { UserService } from '../../../service/user/user.service';
import { Financial } from '../../../interface/Financial';
import { FinancialService } from '../../../service/financial/financial.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [UserService, FinancialService],
})
export class HomePageComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private financialService: FinancialService
  ) {}
  user!: User;
  financials!: Financial[];
  filteredFinancials!: Financial[];
  date: Date = new Date(Date.now());
  monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  month: string = this.monthNames[this.date.getMonth()];
  day: number = this.date.getDate();
  year: number = this.date.getFullYear();
  page: number = 1;

  ngOnInit() {
    this.userService.infos().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.error(error);
      }
    );
    this.financialService.getFinancial(this.page).subscribe(
      (response) => {
        this.financials = response;
        this.filteredFinancials = this.financials.filter(
          (financial) => !financial.isPayed
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
