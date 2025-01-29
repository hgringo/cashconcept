import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-package-include',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './package-include.component.html',
  styleUrl: './package-include.component.scss'
})
export class PackageIncludeComponent {

}
