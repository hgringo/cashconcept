import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'app/components/footer/footer.component';
import { SubheaderComponent } from 'app/components/subheader/subheader.component';
import { AutoSEOService, PageTYPE } from 'app/services/autoSEO.service';
import { ProductService } from 'app/services/product.service';
import { IBreadcrumb } from 'app/types/breadcrumb';
import { IProduct, ProductType } from 'app/types/product';

@Component({
  standalone: true,
  selector: 'app-sitemap',
  imports: [
    CommonModule,
    SubheaderComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './sitemap.component.html',
  styleUrl: './sitemap.component.scss'
})
export class SitemapComponent implements OnInit {

  pageTitle: string = 'menuSiteMap';
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

  coinChangers!: IProduct[];
  controlTerminals!: IProduct[];

  constructor(
    private productService: ProductService,
    private autoSEOService: AutoSEOService
  ) {}

  ngOnInit() {

    this.autoSEOService.prepareSEO(PageTYPE.SitemapPage);

    this.coinChangers = this.productService.getProducts(ProductType.COIN_CHANGER);
    this.controlTerminals = this.productService.getProducts(ProductType.CONTROL_TERMINAL);
  }
}
