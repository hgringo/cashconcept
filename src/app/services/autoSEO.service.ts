import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'ngx-seo-helper';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { _, TranslateService } from '@ngx-translate/core';
import { ISEOBreadcrumb } from 'app/types/breadcrumb';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export enum PageTYPE {
    ProductCoinPage,
    ProductControlPage,
    CoinChangerPage,
    ControlTerminalPage,
    HomePage,
    SitemapPage,
    ComparatorPage,
    ContactPage,
    FinancingPage
}

@Injectable({
  providedIn: 'root'
})
export class AutoSEOService{

    private renderer!: Renderer2;

    // SEO
    seoTitle!: string;
    seoDesc!: string;
    seoKeyWords: string = 'Cashbox, Cash box, Cashbox S, Cashbox 3, Cashbox 5, Cashbox 5+, Cashbox 6, Cashbox 7, Cashbox Pro, Cashbox 7+, Cashbox 8, Cashbox 9, Cashbox order, Cashbox 2, Cashbox 4, Cashbox 2-4, Cashconcept, Cash concept, Caisse horeca, Retail, Caisse retail, Terminal de paiement, Paiement électronique, solutions cash management, Monnayeurs, Monnayeur automatique, Monnayeur automatique Belgique, Monnayeur automatique France, Monnayeurs automatiques Belgique, Monnayeurs automatiques France, Caisse automatique Belgique, Caisse automatique France, Caisses automatiques Belgique, Caisses automatiques France, Monnayeurs automatiques, Caisse automatique, Caisses automatiques, Caisse automatique de paiement, Solution de paiement, Borne de commande, Borne interactive, Caisse de paiement automatique';
    seoAuthor: string = 'CashConcept';
    seoName: string = 'CashConcept';
    seoBreadCrumb: ISEOBreadcrumb[] = [];
    seoUrl!: string;

    constructor(
        private title: Title,
        private meta: Meta,
        private seoService: SEOService,
        private router: Router,
        private translate: TranslateService,
        private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.translate.use('fr');

        // Create an instance of Renderer2
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    prepareSEO(pageType: PageTYPE, name?: string) {

        switch (pageType) {

            case PageTYPE.ProductCoinPage:

                this.translate.get(_('seoProductTitle'), {product_name: name}).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoProductDescCoin', { 'product_name': name });
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl },
                        { name: this.translate.instant('seoBreadCrumbCoinChanger'), url: `${environment.baseUrl}/monnayeurs-automatiques` },
                        { name: name, url: `${environment.baseUrl}/monnayeurs-automatiques${this.router.url}` }
                    ];
                    this.setSEO(pageType, name);
                });

                break;

            case PageTYPE.ProductControlPage:

                this.translate.get(_('seoProductTitle'), {product_name: name}).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoProductDescControl', { 'product_name': name });
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl },
                        { name: this.translate.instant('seoBreadCrumbCoinChanger'), url: `${environment.baseUrl}/bornes-de-commande` },
                        { name: name, url: `${environment.baseUrl}/bornes-de-commande${this.router.url}` }
                    ];
                    this.setSEO(pageType, name);
                });

                break;

            case PageTYPE.ComparatorPage:

                this.translate.get(_('seoComparatorTitle')).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoComparatorDesc');
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl },
                        { name: this.translate.instant('seoBreadCrumbComparator'), url: `${environment.baseUrl}${this.router.url}` }
                    ];
                    this.setSEO(pageType);
                });

                break;

            case PageTYPE.SitemapPage:

                this.translate.get(_('seoSiteMapTitle')).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoSiteMapDesc');
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl },
                        { name: this.translate.instant('seoBreadCrumbSiteMap'), url: `${environment.baseUrl}${this.router.url}` }
                    ];
                    
                    this.setSEO(pageType);
                });

                break;

            case PageTYPE.HomePage:

                this.translate.get(_('seoHomePageTitle')).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoHomePageDesc');
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl }
                    ];
                    
                    this.setSEO(pageType);
                });

                break;

            case PageTYPE.ContactPage:

                this.translate.get(_('seoContactTitle')).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoContactDesc');
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl },
                        { name: this.translate.instant('seoBreadCrumbContact'), url: `${environment.baseUrl}${this.router.url}` }
                    ];
                    this.setSEO(pageType);
                });

                break;

            case PageTYPE.FinancingPage:

                this.translate.get(_('seoFinancingTitle')).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoFinancingDesc');
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl },
                        { name: this.translate.instant('seoBreadCrumbFinancing'), url: `${environment.baseUrl}${this.router.url}` }
                    ];
                    this.setSEO(pageType);
                });

            break;

            case PageTYPE.CoinChangerPage:

                this.translate.get(_('seoCoinChangerTitle')).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoCoinChangerDesc');
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl },
                        { name: this.translate.instant('seoBreadCrumbCoinChanger'), url: `${environment.baseUrl}${this.router.url}` }
                    ];
                    this.setSEO(pageType);
                });

                break;

            case PageTYPE.ControlTerminalPage:

                this.translate.get(_('seoControlTitle')).subscribe((res: string) => {
                    this.seoTitle = res;
                    this.seoDesc = this.translate.instant('seoControlDesc');
                    this.seoBreadCrumb = [
                        { name: this.translate.instant('seoBreadCrumbHome'), url: environment.baseUrl },
                        { name: this.translate.instant('seoBreadCrumbControlTerminal'), url: `${environment.baseUrl}${this.router.url}` }
                    ];
                    this.setSEO(pageType);
                });

                break;
        }
    }

    private setSEO(pageType: PageTYPE, name?: string) {
        // Basic SEO url : BASE_URL + Route
        this.seoUrl = environment.baseUrl + this.router.url;

        if (pageType === PageTYPE.ProductCoinPage) this.seoUrl = environment.baseUrl + '/monnayeurs-automatiques' + this.router.url;
        if (pageType === PageTYPE.ProductControlPage) this.seoUrl = environment.baseUrl + '/bornes-de-commande' + this.router.url;

        this.title.setTitle(this.seoTitle);
        this.meta.updateTag({ name:'description', content: this.seoDesc });
        this.meta.updateTag({ name:'keywords', content: this.seoKeyWords });
        this.meta.updateTag({ name:'author', content: this.seoAuthor });
        this.meta.updateTag({ name:'robots', content: 'index, follow' });
        
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: this.seoTitle });
        this.meta.updateTag({ name: 'twitter:description', content: this.seoDesc });
        this.meta.updateTag({ name: 'twitter:image', content: `${environment.baseUrl}/assets/logo.png` });
        this.meta.updateTag({ name: 'twitter:site', content: '@cashconcept' });

        // Schema.org markup WebPage
        const webpageSchema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: this.seoTitle,
            url: this.seoUrl,
            description: this.seoDesc
        };

        // Schema.org markup Organization
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: this.seoName,
            url: environment.baseUrl,
            logo: `${environment.baseUrl}/assets/logo.png`,
        };

        // Schema.org markup WebSite
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": this.seoName,
            "url": environment.baseUrl,
            "description": this.seoDesc
        };

        var productSchema: any;

        if (pageType === PageTYPE.ProductCoinPage) {

            productSchema = {
                "@context": "http://schema.org",
                "@type": "Product",
                "name": name,
                "url": this.seoUrl,
                "image": `${environment.baseUrl}/assets/logo.png`,
                "description": this.seoDesc,
                "brand": {
                    "@type": "Brand",
                    "name": "CasbBox"
                }
            };
        }

        if (pageType === PageTYPE.ProductControlPage) {

           productSchema = {
                "@context": "http://schema.org",
                "@type": "Product",
                "name": name,
                "url": this.seoUrl,
                "image": `${environment.baseUrl}/assets/logo.png`,
                "description": this.seoDesc,
                "brand": {
                    "@type": "Brand",
                    "name": "CasbBox"
                }
            };
        }

        this.addSchema({});
        this.addSchema(webpageSchema);
        this.addSchema(organizationSchema);
        this.addSchema(websiteSchema);

        if (productSchema) this.addSchema(productSchema);
        
        this.seoService.setHreflang('en', this.seoUrl);
        this.seoService.setHreflang('fr', this.seoUrl);
        this.seoService.setHreflang('nl', this.seoUrl);
    
        this.seoService.setBreadcrumbSchema(this.seoBreadCrumb);
        
        // Schema.org markup for Google+
        this.meta.updateTag({ itemprop: 'name', content: this.seoName });
        this.meta.updateTag({ itemprop: 'description', content: this.seoDesc });
        this.meta.updateTag({ itemprop: 'image', content: `${environment.baseUrl}/assets/logo.png` });
            
        // Open Graph for Facebook
        this.meta.updateTag({ property: 'og:title', content: this.seoTitle });
        this.meta.updateTag({ property: 'og:description', content: this.seoDesc });
        this.meta.updateTag({ property: 'og:image', content: `${environment.baseUrl}/assets/logo.png` });
        this.meta.updateTag({ property: 'og:image:alt', content: 'Logo' });
        this.meta.updateTag({ property: 'og:url', content: this.seoUrl });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:site_name', content: this.seoName });
        
        if (environment.development) {
            this.seoService.auditSEO(); // Run SEO audit to check essential tags
        }
    }

    private addSchema(schema: object) {
        if (isPlatformBrowser(this.platformId)) {
          const script = this.renderer.createElement('script');
          script.type = 'application/ld+json';
          script.text = JSON.stringify(schema);
          this.renderer.appendChild(this.document.head, script);
        }
    }
}