import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  imgCoinChanger: string = 'assets/products/CashBox 3/CashBox 3_side_face.png';
  imgTerminalControl: string = 'assets/products/CashBox Order 2-4/CashBox Order 2_side_face.png';

}
