import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerService } from 'app/services/customer.service';
import { ICustomer } from 'app/types/customer';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-customers',
  imports: [
    CommonModule,
    CarouselModule,
    TranslateModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  responsiveOptions = [
    {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1,
    },
  ];

  customers!: ICustomer[];

  constructor(
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }
}
