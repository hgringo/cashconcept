import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InstallationService } from 'app/services/installation.service';
import { IGalleryItem } from 'app/types/product';
import { CarouselModule } from 'primeng/carousel';

@Component({
  standalone: true,
  selector: 'app-facebook-feed',
  imports: [
    CommonModule,
    TranslateModule,
    CarouselModule
  ],
  templateUrl: './facebook-feed.component.html',
  styleUrl: './facebook-feed.component.scss',
  host: {ngSkipHydration: 'true'}
})
export class FacebookFeedComponent {

  installation: IGalleryItem[] = [];

  constructor(
    private installService: InstallationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.installation = this.installService.getItems();
  }

  goToFB() {
    if (isPlatformBrowser(this.platformId)) {
      window.open('https://www.facebook.com/Cashconceptsolution', '_blank');
    }
  }

}
