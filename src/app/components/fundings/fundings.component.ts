import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ILease } from 'app/types/lease';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-fundings',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CarouselModule
  ],
  templateUrl: './fundings.component.html',
  styleUrl: './fundings.component.scss'
})
export class FundingsComponent{

  leasingCompanies: ILease[] = [
    { name: 'Europa Bank', src: 'assets/fundings/europabank-logo.svg' },
    { name: 'Grenke Lease', src: 'assets/fundings/grenke-logo.svg' },
    { name: 'BNP Paribas', src: 'assets/fundings/bnp-paribas-logo.svg' },
    { name: 'Realease Capital', src: 'assets/fundings/realease-logo.png' },
    { name: 'Axial Lease', src: 'assets/fundings/axialease-logo.jpeg' },
  ];
}
