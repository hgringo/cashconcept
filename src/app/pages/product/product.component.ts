import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from 'app/components/footer/footer.component';
import { PackageIncludeComponent } from 'app/components/package-include/package-include.component';
import { RelatedComponent } from 'app/components/related/related.component';
import { SubheaderComponent } from 'app/components/subheader/subheader.component';
import { ComparatorService } from 'app/services/comparator.service';
import { ProductService } from 'app/services/product.service';
import { IBreadcrumb } from 'app/types/breadcrumb';
import { IProduct, ProductType } from 'app/types/product';
import { ButtonModule } from 'primeng/button';
import { ShareButtons } from 'ngx-sharebuttons/buttons';
import { AutoSEOService, PageTYPE } from 'app/services/autoSEO.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [
    CommonModule,
    TranslatePipe,
    ButtonModule,
    SubheaderComponent,
    RelatedComponent,
    PackageIncludeComponent,
    FooterComponent,
    ShareButtons
  ],
  
})
export class ProductPage {

  pageTitle!: string;
  breadcrumbs: IBreadcrumb[] = [
    {
      label : "menuHome",
      url: '/'
    },
    {
      label : '',
      url: '/'
    }, 
    {
      label : '',
      active: true
    }
  ];

  subHeaderClassName: string = '';

  activeThumbnailIndex: number = 0;
  productId!: string;
  product!: IProduct;

  carouselStartIndex: number = 0;
  thumbnailsToShow: number = 5;

  isVideoActive = false;

  isShareMenuOpen: boolean = false;

  activeImage!: string;
  activeVideo!: SafeResourceUrl;

  ariaLabel: string = 'Share Product';

  get displayedThumbnails(): any[] {
    return this.product.gallery.slice(
      this.carouselStartIndex,
      this.carouselStartIndex + this.thumbnailsToShow
    );
  }

  constructor(
    private comparatorService: ComparatorService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private autoSEOService: AutoSEOService,
    private sanitizer: DomSanitizer
  ) {}
  
  ngOnInit() {

    this.route.params.subscribe((params) => {

      this.productId = params['id'];
      
      if (this.productId) {

        var item = this.productService.getProductById(this.productId);

        if (item != undefined) {

          this.product = item;
          this.pageTitle = this.product.name;
          this.subHeaderClassName = this.product.name.replaceAll(' ', '_');

          this.activeImage = this.product.gallery[this.activeThumbnailIndex]?.src;

          switch(this.product.type) {

            case ProductType.COIN_CHANGER:

              this.breadcrumbs[this.breadcrumbs.length - 2].label = 'menuCoinChangers';
              this.breadcrumbs[this.breadcrumbs.length - 2].url = '/monnayeurs-automatiques';

              this.autoSEOService.prepareSEO(PageTYPE.ProductCoinPage, this.product.name);

              break;

            case ProductType.CONTROL_TERMINAL:

              this.breadcrumbs[this.breadcrumbs.length - 2].label = 'menuControlCommands';
              this.breadcrumbs[this.breadcrumbs.length - 2].url = '/bornes-de-commande';

              this.autoSEOService.prepareSEO(PageTYPE.ProductControlPage, this.product.name);

              break;
          }

          this.breadcrumbs[this.breadcrumbs.length - 1].label = this.product.name;

          this.comparatorService.products$.subscribe((products: IProduct[]) => {
            this.product.isCompared = products.find(item => item.id === this.product.id) ? true : false;
          });
        }
      }
    });
    
  }

  setActiveThumbnail(index: number) {
    this.activeThumbnailIndex = index;
    this.isVideoActive = this.product.gallery[index]?.isVideo || false;

    if (!this.isVideoActive) this.activeImage = this.product.gallery[this.activeThumbnailIndex]?.src;
    else this.activeVideo = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.product.gallery[this.activeThumbnailIndex]?.src}?autoplay=1&mute=0`);
  }

  downloadTechnicalFeatures() {
    var lang = this.translateService.currentLang;
    if (lang) window.open(this.product.technicalFeatures?.find(_ => _.languageCode === lang)?.path, '_blank');
  }

  nextThumbnail() {
    if (this.carouselStartIndex + this.thumbnailsToShow < this.product.gallery.length) {
      this.carouselStartIndex++;
    }
  }

  prevThumbnail() {
    if (this.carouselStartIndex > 0) {
      this.carouselStartIndex--;
    }
  }

  arrowUpDisabled(): boolean {
    return this.carouselStartIndex === 0;  
  }

  arrowDownDisabled(): boolean {
    return this.carouselStartIndex + this.thumbnailsToShow >= this.product.gallery.length;
  }

  toggleShareMenu() {
    this.isShareMenuOpen = !this.isShareMenuOpen;
  }

  getShareIcon(): string {
    return this.isShareMenuOpen ? 'pi pi-times' : 'pi pi-upload';
  }

  openShare() {
    if (navigator.share) {
      navigator
        .share({
          title: this.product.name,
          text: 'I found this page really interesting, check it out:',
          url: window.location.href,
        })
        .catch((error) => console.error('Error sharing:', error));
    } 
    else {
      this.toggleShareMenu();
    }
  }

}
