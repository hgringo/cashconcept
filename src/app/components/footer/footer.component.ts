import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/services/product.service';
import { IProduct, ProductType } from 'app/types/product';
import { FacebookFeedComponent } from '../facebook-feed/facebook-feed.component';
import { TranslateModule } from '@ngx-translate/core';
import { faUser, faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from 'environments/environment';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [
    CommonModule,
    TranslateModule,
    FacebookFeedComponent,
    FontAwesomeModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faChevronRight = faChevronRight;
  
  environment = environment;

  coinChangers!: IProduct[];
  controlTerminals!: IProduct[];

  currentYear:number = new Date().getFullYear();

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.coinChangers = this.productService.getProducts(ProductType.COIN_CHANGER);
    this.controlTerminals = this.productService.getProducts(ProductType.CONTROL_TERMINAL);
  }

}
