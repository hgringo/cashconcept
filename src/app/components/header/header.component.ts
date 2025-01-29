import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ProductService } from 'app/services/product.service';
import { IProduct, ProductType } from 'app/types/product';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { languages } from 'app/types/language';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule,
    TranslateModule,
    SelectModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private readonly platform = inject(PLATFORM_ID);

  environment = environment;

  control!: FormControl;

  coinChangers!: IProduct[];
  controlTerminals!: IProduct[];

  isExpandedSBMonnayeurs: boolean = false;
  isExpandedSBBornes: boolean = false;

  menuOpen: boolean = false;
  isScrolled: boolean = false;

  languages: string[] = languages;

  constructor(
    private productService: ProductService,
    private renderer: Renderer2,
    private translate: TranslateService

  ) {}

  ngOnInit() {

    // Set default lang for language selection
    var defaultLang: string = 'fr';

    if (isPlatformBrowser(this.platform)) {
      defaultLang = localStorage.getItem('language') || 'fr';
    }

    this.control = new FormControl(defaultLang);

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
  
  switchLanguage(lang: string) {

    this.translate.use(lang);

    if (isPlatformBrowser(this.platform)) { 
      localStorage.setItem('language', lang);
    }
  }
}
