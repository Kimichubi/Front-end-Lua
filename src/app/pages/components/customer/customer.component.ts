import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer/customer.service';
import { Customer } from '../../../interface/Customer';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  providers: [CustomerService],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  constructor(private customerService: CustomerService) {}
  customers!: Customer[];
  page: number = 1;
  ngOnInit() {
    this.customerService.getCustomers(this.page).subscribe(
      (response) => {
        this.customers = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
