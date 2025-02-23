import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivitiesComponent } from 'app/components/activities/activities.component';
import { BannerComponent } from 'app/components/banner/banner.component';
import { CategoriesComponent } from 'app/components/categories/categories.component';
import { CustomersComponent } from 'app/components/customers/customers.component';
import { FeaturesComponent } from 'app/components/features/features.component';
import { FooterComponent } from 'app/components/footer/footer.component';
import { FundingsComponent } from 'app/components/fundings/fundings.component';
import { AutoSEOService, PageTYPE } from 'app/services/autoSEO.service';
import { TranslationService } from 'app/services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    FeaturesComponent,
    ActivitiesComponent,
    CategoriesComponent,
    FundingsComponent,
    FooterComponent,
    CustomersComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

    constructor(
      private autoSEOService: AutoSEOService,
      private translationService: TranslationService
    ) {}

    ngOnInit() {

      this.translationService.initLanguage();

      this.autoSEOService.prepareSEO(PageTYPE.HomePage);
    }
}
