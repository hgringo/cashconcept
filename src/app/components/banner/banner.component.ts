import { CommonModule, DOCUMENT, NgOptimizedImage, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from 'app/services/product.service';
import { IPosition } from 'app/types/position';
import { IProduct, ProductType } from 'app/types/product';
import { Carousel, CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit, AfterViewInit {

  products!: IProduct[];

  @ViewChildren('headlineItem') listItems!: QueryList<ElementRef<HTMLLIElement>>;

  currentIndex: number = 0;
  #intervalId!: ReturnType<typeof setInterval>;
  
  constructor(
    private productService: ProductService,
    private scroller: ViewportScroller,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {

    // Fix mobile scrolling
    Carousel.prototype.onTouchMove = () => { };

    this.products = this.productService.getProducts();
  }

  ngAfterViewInit() {
    this.startCyclingItems();
  }

  getTargetUrl(product: IProduct) : string {

    var url: string = '';

    if (!product) return url;

    switch (product.type) {
      case ProductType.COIN_CHANGER:
        url = '/monnayeurs-automatiques';
        break;
      case ProductType.CONTROL_TERMINAL:
        url = '/bornes-de-commande';
        break;
    }

    return url;
  }

  getPosition(): IPosition | undefined {

    const targetElement = this.document.getElementById('content');
    
    if (!targetElement) return; 

    const rect = targetElement.getBoundingClientRect();

    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  }

  scrollToContent() {
    const position = this.getPosition();
    if (position) this.scroller.scrollToPosition([position.left, position.top - 50]);
  }

   /**
   * Starts the cycle animation for list items.
   */
   private startCyclingItems(): void {
    this.#intervalId = setInterval(() => {
      this.cycleListItems();
    }, 2000);
  }

  /**
   * Cycles through list items by adding/removing the "active" class.
   */
  private cycleListItems(): void {
    const itemsArray = this.listItems.toArray();

    // Remove active class from all items
    itemsArray.forEach((item) => this.renderer.removeClass(item.nativeElement, 'active'));

    // Add active class to the current item
    const currentItem = itemsArray[this.currentIndex];
    if (currentItem) {
      this.renderer.addClass(currentItem.nativeElement, 'active');
    }

    // Move to the next item (loop back to the first at the end)
    this.currentIndex = (this.currentIndex + 1) % itemsArray.length;
  }

  ngOnDestroy(): void {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
    }
  }
}
