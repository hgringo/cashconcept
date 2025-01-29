import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
  providers: [
  ]
})
export class PartnersComponent {

  partnersResponsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 4,
          numScroll: 1
      },
      {
          breakpoint: '990px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  partners: any[] = [];

  constructor(
  ) {}

  ngOnInit() {

  }

}
