import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface LogoItem {
  src: string;
  alt: string;
}

@Component({
  standalone: true,
  selector: 'app-programs',
  imports: [
    CommonModule,
    // TranslatePipe
  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss'
})
export class ProgramsComponent {

  logos : LogoItem[] = [
    { src: 'assets/programs/PosBel.png', alt: 'PosBel' },
    { src: 'assets/programs/RestoMax.png', alt: 'RestoMax' },
    { src: 'assets/programs/UrbanPos.png', alt: 'UrbanPos' },
    { src: 'assets/programs/Odoo.png', alt: 'Odoo' },
    { src: 'assets/programs/Aurore Solution.png', alt: 'Aurore Solution' },
    { src: 'assets/programs/RestoConcept.png', alt: 'RestoConcept' },
    { src: 'assets/programs/B.S.S.png', alt: 'B.S.S' },
    { src: 'assets/programs/Slytio.png', alt: 'Slytio' },
  ];

}
