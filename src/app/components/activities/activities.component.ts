import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {

  imgBarber: string = 'assets/activities/1.webp';
  imgHoreca: string = 'assets/activities/2.webp';
  imgShopping: string = 'assets/activities/3.webp';

}
