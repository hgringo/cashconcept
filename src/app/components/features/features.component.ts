import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { faShieldHalved, faShippingFast, faCheck, faChartBar } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-features',
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

  faShieldHalved = faShieldHalved;
  faShippingFast = faShippingFast;
  faCheck = faCheck;
  faChartBar = faChartBar;
}
