import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CollapsibleComparatorComponent } from 'app/components/collapsible-comparator/collapsible-comparator.component';
import { FooterComponent } from 'app/components/footer/footer.component';
import { SavComponent } from 'app/components/sav/sav.component';
import { SubheaderComponent } from 'app/components/subheader/subheader.component';
import { AutoSEOService, PageTYPE } from 'app/services/autoSEO.service';
import { ComparatorService } from 'app/services/comparator.service';
import { ProductService } from 'app/services/product.service';
import { TranslationService } from 'app/services/translation.service';
import { IBreadcrumb } from 'app/types/breadcrumb';
import { IProduct, ProductType } from 'app/types/product';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  standalone: true,
  selector: 'app-bornes-de-commande',
  templateUrl: './bornes-de-commande.component.html',
  styleUrls: ['./bornes-de-commande.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    SubheaderComponent,
    SavComponent,
    CollapsibleComparatorComponent,
    TranslateModule,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlTerminalPage implements OnInit{

  products : IProduct[] = [];
  comparedProducts: IProduct[] = [];

  pageTitle: string = 'menuControlCommands';
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

  constructor(
    private comparatorService: ComparatorService,
    private productService: ProductService,
    private autoSEOService: AutoSEOService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {

    this.translationService.initLanguage();

    this.autoSEOService.prepareSEO(PageTYPE.ControlTerminalPage);

    this.products = this.productService.getProducts(ProductType.CONTROL_TERMINAL);

    this.comparatorService.products$.subscribe((products: IProduct[]) => {
      
      this.comparedProducts = products;

      this.products.map((product: IProduct) => {
        product.isCompared = products.find(item => item.id === product.id) ? true : false;
      });

    });

  }

  onCompare(event: any, product: IProduct) {

    if (event.checked) {
      product.isCompared = true;
      this.comparatorService.addProduct(product);
    } 
    else {
      product.isCompared = false;
      this.comparatorService.removeProduct(product.id);
    }
  }

  handleRemoveProduct(productId: string): void {
    this.comparatorService.removeProduct(productId);
  }
}
