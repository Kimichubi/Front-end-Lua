import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer/customer.service';
import { Customer } from '../../../interface/Customer';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  providers: [CustomerService],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  constructor(private customerService: CustomerService) {}
  customers!: Customer[];
  viewMode: string = 'listar';
  page: number = 1;

  customerFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
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

  handleSubmit() {}
}
