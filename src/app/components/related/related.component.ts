import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from 'app/services/product.service';
import { IProduct } from 'app/types/product';
import { Carousel, CarouselModule } from 'primeng/carousel';

@Component({
  standalone: true,
  selector: 'related-products',
  imports: [
    CommonModule,
    CarouselModule,
    TranslateModule
  ],
  templateUrl: './related.component.html',
  styleUrl: './related.component.scss',
  host: {'related-id': 'related-1'}
})
export class RelatedComponent implements OnInit {

  @Input() currentProduct!: IProduct;
  products!: IProduct[];

  responsiveOptions = [
    {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
    },
  ];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {

    // Fix mobile scrolling
    Carousel.prototype.onTouchMove = () => { };

    this.products = this.productService.getProducts();

    if (this.currentProduct) {
      this.products = this.products.filter(item => item.id !== this.currentProduct?.id);
    }
  }

}
