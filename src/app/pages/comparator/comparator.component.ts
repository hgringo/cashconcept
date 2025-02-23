import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComparatorService } from 'app/services/comparator.service';
import { IProduct } from 'app/types/product';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SubheaderComponent } from 'app/components/subheader/subheader.component';
import { IBreadcrumb } from 'app/types/breadcrumb';
import { SavComponent } from 'app/components/sav/sav.component';
import { RelatedComponent } from 'app/components/related/related.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'app/components/footer/footer.component';
import { Router } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutoSEOService, PageTYPE } from 'app/services/autoSEO.service';
import { TranslationService } from 'app/services/translation.service';

@Component({
  standalone: true,
  selector: 'app-comparator',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    SubheaderComponent,
    SavComponent,
    RelatedComponent,
    TranslateModule,
    FooterComponent,
    FontAwesomeModule
  ],
  templateUrl: './comparator.component.html',
  styleUrl: './comparator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparatorPage implements OnInit {

  pageTitle: string = 'comparatorTitle';
  breadcrumbs: IBreadcrumb[] = [
    {
      label : "menuHome",
      url: '/'
    }, 
    {
      label : this.pageTitle,
      active: true
    }
  ];

  faTrash = faTrashCan;

  // Define the maximum number of products to compare
  maxProducts = 4;

  comparisonProducts: IProduct[] = [];

  // Use keyof IProduct for type-safe indexing
  productProperties: { label: string; key: keyof IProduct }[] = [
    { label: 'comparatorAcceptVerify', key: 'acceptVerify' },
    { label: 'comparatorAcceptBundle', key: 'acceptBundle' },
    { label: 'comparatorRedistribute', key: 'nbRedistribute' },
    { label: 'comparatorTypeOfTickets', key: 'typeOfTicket' },
    { label: 'comparatorRecycler', key: 'nbRecycler' },
    { label: 'comparatorRecyclerCapacity', key: 'nbTicket' },
    { label: 'comparatorTicketSafeBox', key: 'nbTicket2' },
    { label: 'comparatorRedistributeBundle', key: 'redistributeBundle' },
    { label: 'comparatorFakeMoney', key: 'fakeMoney' },
    { label: 'comparatorDistributor', key: 'nbDistributor' },
    { label: 'comparatorShielding', key: 'shieldingMM' },
    { label: 'comparatorTransponder', key: 'transponder' },
    { label: 'comparatorMonitor', key: 'monitor' },
    { label: 'comparatorMonitorInche', key: 'inche' },
    { label: 'comparatorScreen', key: 'screen' },
    { label: 'comparatorScreenInche', key: 'screenInche' },
    { label: 'comparatorCalculator', key: 'calculator' },
    { label: 'comparatorApp', key: 'application' },
    { label: 'comparatorOS', key: 'os' },
    { label: 'comparatorLength', key: 'length' },
    { label: 'comparatorDepth', key: 'depth' },
    { label: 'comparatorHeight', key: 'height' },
    { label: 'comparatorWeight', key: 'weight' }
  ];

  booleanProperties: Array<keyof IProduct> = [
    'acceptVerify',
    'acceptBundle',
    'recycler',
    'redistributeBundle',
    'fakeMoney',
    'transponder',
    'monitor',
    'screen',
    'calculator',
    'application',
    'printer',
    'leds',
    'os'
  ];

  multipleDimensions: Array<keyof IProduct> = [
    'length',
    'depth',
    'height'
  ];

  isMultipleDimensionsProperty(name: keyof IProduct): boolean {
    return this.multipleDimensions.includes(name);
  }

  get emptyOrProducts(): (IProduct | null)[] {
    const emptySlots = Array(this.maxProducts - this.comparisonProducts.length).fill(null);
    return [...this.comparisonProducts, ...emptySlots];
  }
  
  constructor(
    private comparatorService: ComparatorService,
    private router: Router,
    private autoSEOService: AutoSEOService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {

    this.translationService.initLanguage();

    this.autoSEOService.prepareSEO(PageTYPE.ComparatorPage);

    this.comparatorService.products$.subscribe((products: IProduct[]) => {
      this.comparisonProducts = products.slice(0, this.maxProducts);
    });
  }

  trackByProperty(index: number, item: any): string {
    return item.label;
  }

  isBooleanProperty(key: keyof IProduct): boolean {
    return this.booleanProperties.includes(key);
  }

  onCleanComparator() {
    this.comparatorService.removeAll();
    const previousPage = localStorage.getItem('previousPageComparator');
    if (previousPage) {
      localStorage.removeItem('previousPageComparator');
      this.router.navigate([previousPage]);
    }
  }

  getStarClass(rating: number, starValue: number) : string {
    
    var className : string = '';

    if ( starValue <= Math.floor(rating) ) {
      className = 'pi-star';
    }
    else {
      if ( starValue === Math.ceil(rating) && rating % 1 !== 0 ) {
        className = 'pi-star-half';
      }
      else {
        if ( starValue > rating ) {
          className = 'pi-star-o';
        }
      }
    }

    return className;
  }
}
