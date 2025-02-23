import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ProductService } from 'app/services/product.service';
import { IProduct, ProductType } from 'app/types/product';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { languages } from 'app/types/language';
import { environment } from 'environments/environment';

@Component({
  standalone: true,
  selector: 'header',
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {'collision-id': 'header-1'}
})
export class HeaderComponent implements OnInit {

  private readonly platform = inject(PLATFORM_ID);

  environment = environment;

  coinChangers!: IProduct[];
  controlTerminals!: IProduct[];

  isExpandedSBMonnayeurs: boolean = false;
  isExpandedSBBornes: boolean = false;

  menuOpen: boolean = false;
  isScrolled: boolean = false;

  languages: string[] = languages;
  selectedLanguage!: string; // Default language
  defaultLang: string = 'fr'; // Set default lang for language selection
  dropdownOpen = false;

  constructor(
    private productService: ProductService,
    private renderer: Renderer2,
    private translate: TranslateService

  ) {}

  ngOnInit() {

    if (isPlatformBrowser(this.platform)) {
      this.selectedLanguage = localStorage.getItem('language') || this.defaultLang;
    }

    this.coinChangers = this.productService.getProducts(ProductType.COIN_CHANGER);
    this.controlTerminals = this.productService.getProducts(ProductType.CONTROL_TERMINAL);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50; // Adjust scroll threshold as needed
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  toggleSBMonnayeurs() {
    this.isExpandedSBMonnayeurs = !this.isExpandedSBMonnayeurs;
  }

  toggleSBBornes() {
    this.isExpandedSBBornes = !this.isExpandedSBBornes;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
  switchLanguage(lang: string) {

    this.selectedLanguage = lang;
    this.dropdownOpen = false;

    if (isPlatformBrowser(this.platform)) { 
      localStorage.setItem('language', lang);
      this.translate.use(lang);
    }
  }
}
