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

  get displayedThumbnails(): any[] {
    return this.product.gallery.slice(
      this.carouselStartIndex,
      this.carouselStartIndex + this.thumbnailsToShow
    );
  }

  // SEO
  seoTitle: string = 'seoProductTitle';
  seoDesc!: string;
  seoKeyWords: string = 'Cashdro,Cashdro S,Cashdro 2,Cashdro 3,Cashdro 4,Cashdro 4+,Cashdro 5,Cashdro 6,Cashdro 7,T-quiosk,T-quiosk TQ-210,T-quiosk TQ-212,T-quiosk TQ-240,T-quiosk TQ-242,TQ-1,TQ-100,TQ-20,TQ-200,TQ-202,TQ-22,TQ-230,TQ-232,Glory,GLORY CI-10,GLORY CI-5,GLORY CI-15,GLORY CI-10X,GLORY CI-100,GLORY CI-100R,GLORY CI-100X,GLORY CI-200,GLORY CI-30B,GLORY CI-50,GLORY CI-50B,GLORY CASH,CPI Paypod,CPI Paypods,Paypod,Cashmatic,Cashmatic 460,Cashmatic 660,Cashmatic 860,Cashmatic 1060,SP 460,SP 660,SP 860,SP 1060,Cashmatic VisualPay,Cashmatic VisualPay 17,Cashmatic VisualPay 22,Cashmatic VisualPay 27,Cashmatic VisualPay 32,VP 17,VP 22,VP 27,VP 32,cashmatic gdo,CASHMAG 5R,CASHMAG 5K,CASHMAG 5T,CASHMAG 5F,CASHMAG 5FC,Box Ticket CASHMAG,CASHMAG F46,CASHMAG F26,CASHMAG F26 métal,CASHMAG DESKTOP,CASHMAG DESKTOP métal,CASHMAG HYBRID,CASHMAG 1F,Cashdev,Complete Payment Kiosk-L,CPK-L,Float Recycler Manager,FRM,Easy Bill Breaker,EBB,Easy Money Changer,EMC,Fast Coin Converter,Smart Cash Manager-A,FCC,SCM-A,Smart Cash Manager-B,SCM-B,SCM-C,ISS,Smart Cash Manager-C,Intelligent Safe System,Cashlogy,Cashlogy pos 1000,Cashlogy pos 1500,Cashlogy safe,CashKeeper,CashKeeper CK900,CashKeeper CK900E,CashKeeper CK950,CashKeeper CK1000,Cashbox,Cash box,Cashbox S,Cashbox 3,Cashbox 5,Cashbox 5+,Cashbox 6,Cashbox 7,Cashbox Pro,Cashbox 7+,Cashbox 8,Cashbox 9,Cashbox order,Cashbox 2,Cashbox 4,Cashbox 2-4,Casio,Caisse Casio,Csi,Monnayeur Alice,4 cash,Jfc,Azkoyen,CASHINFINITY,Vne,Vvnt,Sitasoft,Sita soft,Sita software,Logicash,cashmag,Cashconcept,Cash concept,S4I,smart4Invest,Pigs,Jdc,Moneytic,Resto max,Lightspeed,Caisse horeca,Retail,Caisse retail,odoo,Cashless,Viva wallet,Bancontact,Terminal de paiement,Paiement électronique,solutions cash management,Thopermax,Resto concept,DNMAcquisition,Techno Buro,Cashsafe,Cashconcept,Cash concept,Cash-pro,Monnayeurs,Monnayeur automatique,Monnayeur automatique Belgique,Monnayeur automatique France,Monnayeurs automatiques Belgique,Monnayeurs automatiques France,Caisse automatique Belgique,Caisse automatique France,Caisses automatiques Belgique,Caisses automatiques France,Cashdro belgique,Cashdro france,Cash dro belgique,Cash dro france,Glory cash belgique,Glory cash France,Cashmatic Belgique,Cashmatic france,Cashlogy belgique,Cashlogy france,Cashdev belgique,Cashdev france,Cashmag Belgique,Cashmag france,Paypod belgique,Paypod france,Cashbox Belgique,Cashbox france,Cash box Belgique,Cash box france,Cashkeeper belgique,Cashkeeper france,Monnayeurs automatiques,Caisse automatique,Caisses automatiques,Caisse automatique de paiement,Caisse monnayeur,Caisse automatique monnayeur,Solution de paiement,Tiroir caisse,Solution paiement,Systeme caisse enregistreuse,Monnayeur automatique prix,Borne de commande,Paiement solution,Borne interactive,Caisse tactile,Glory Cash,Monnayeur cashdro,Monnayeur Glory,Monnayeur CashDev,Monnayeur Cashmatic,Monnayeur CashMag,Monnayeur cashlogy,Monnayeur paypod,Monnayeur cashkeeper,Caisse enregistreuse magasin,Caisse de paiement automatique,Cashdro prix,Automatische kassa,Caisse de magasin,Caisse enregistreuse simple,Solutions de paiements,gestion du cash,bornes de commandes automatiques';
  seoAuthor: string = 'CashConcept';
  seoName: string = 'CashConcept';

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
