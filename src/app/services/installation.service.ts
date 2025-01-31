import { Injectable } from '@angular/core';
import { IGalleryItem } from 'app/types/product';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {

    #install : IGalleryItem[] = [
        { src: "assets/products/CashBox S/CashBox S_integrated.png", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_integrated.png", isVideo: false },
        { src: "assets/products/CashBox S/CashBox S_posed.jpeg", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_posed.png", isVideo: false },
        { src: "assets/products/CashBox S/CashBox S_posed_2.jpeg", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_posed_2.png", isVideo: false },
        { src: "assets/products/CashBox S/CashBox S_posed_3.jpeg", thumbnail: "assets/products/CashBox S/thumbnails/CashBox S_posed_3.png", isVideo: false },
        { src: "assets/products/CashBox Mini/CashBox Mini_placed_on.jpg", thumbnail: "assets/products/CashBox Mini/thumbnails/CashBox Mini_placed_on.png", isVideo: false },
        { src: "assets/products/CashBox Mini/CashBox Mini_integrated_on.png", thumbnail: "assets/products/CashBox Mini/thumbnails/CashBox Mini_integrated_on.png", isVideo: false },
        { src: "assets/products/CashBox 3/CashBox 3_integrated_on.png", thumbnail: "assets/products/CashBox 3/thumbnails/CashBox 3_integrated_on.png", isVideo: false },
        { src: "assets/products/CashBox 3/CashBox-3_placed_on.png", thumbnail: "assets/products/CashBox 3/thumbnails/CashBox-3_placed_on.png", isVideo: false },
        { src: "assets/products/CashBox 3/CashBox-3_on_base.png", thumbnail: "assets/products/CashBox 3/thumbnails/CashBox-3_on_base.png", isVideo: false },
        { src: "assets/products/CashBox 5/CashBox-5_placed_on.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_placed_on.png", isVideo: false },
        { src: "assets/products/CashBox 5/CashBox 5_integrated_on_2.jpeg", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox 5_integrated_on_2.png", isVideo: false },
        { src: "assets/products/CashBox 5/CashBox-5_integrated_on_3.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_integrated_on_3.png", isVideo: false },
        { src: "assets/products/CashBox 5/CashBox-5_on_base_2.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_on_base_2.png", isVideo: false },
        { src: "assets/products/CashBox 5/CashBox-5_tamines.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_tamines.png", isVideo: false },
        { src: "assets/products/CashBox 5/CashBox 5_on_base.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox 5_on_base.png", isVideo: false },
        { src: "assets/products/CashBox 5/CashBox-5_placed_on_2.png", thumbnail: "assets/products/CashBox 5/thumbnails/CashBox-5_placed_on_2.png", isVideo: false },
        { src: "assets/products/CashBox Pro/CashBox-Pro_placed_on.png", thumbnail: "assets/products/CashBox Pro/thumbnails/CashBox-Pro_placed_on.png", isVideo: false },
        { src: "assets/products/CashBox Pro/CashBox-Pro_placed_on_2.png", thumbnail: "assets/products/CashBox Pro/thumbnails/CashBox-Pro_placed_on_2.png", isVideo: false },
        { src: "assets/products/CashBox Pro/CashBox-Pro_placed_on_3.png", thumbnail: "assets/products/CashBox Pro/thumbnails/CashBox-Pro_placed_on_3.png", isVideo: false },
        { src: "assets/products/CashBox 7/CashBox 7_on_base.png", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_on_base.png", isVideo: false },
        { src: "assets/products/CashBox 7/CashBox 7_on_base_2.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_on_base_2.png", isVideo: false },
        { src: "assets/products/CashBox 7/CashBox 7_integrated_on.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_integrated_on.png", isVideo: false },
        { src: "assets/products/CashBox 7/CashBox 7_integrated_on_2.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_integrated_on_2.png", isVideo: false },
        { src: "assets/products/CashBox 7/CashBox 7_integrated_on_3.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_integrated_on_3.png", isVideo: false },
        { src: "assets/products/CashBox 7/CashBox 7_placed_on.jpg", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_placed_on.png", isVideo: false },
        { src: "assets/products/CashBox 7/CashBox 7_placed_on_2.png", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_placed_on_2.png", isVideo: false },
        { src: "assets/products/CashBox 7/CashBox 7_placed_on_3.png", thumbnail: "assets/products/CashBox 7/thumbnails/CashBox 7_placed_on_3.png", isVideo: false },
        { src: "assets/products/CashBox 7+/CashBox 7+_on_base.png", thumbnail: "assets/products/CashBox 7+/thumbnails/CashBox 7+_on_base.png", isVideo: false },
        { src: "assets/products/CashBox 7+/CashBox 7+_placed_on.png", thumbnail: "assets/products/CashBox 7+/thumbnails/CashBox 7+_placed_on.png", isVideo: false },
        { src: "assets/products/CashBox 8/CashBox 8_placed_on.png", thumbnail: "assets/products/CashBox 8/thumbnails/CashBox 8_placed_on.png", isVideo: false },
        { src: "assets/products/CashBox 8/CashBox 8_integrated.png", thumbnail: "assets/products/CashBox 8/thumbnails/CashBox 8_integrated.png", isVideo: false },
        { src: 'assets/products/CashBox Order 2-4/CashBox Order - Fastfood.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order - Fastfood.png', isVideo: false },
        { src: 'assets/products/CashBox Order 2-4/CashBox Order - Fastfood_2.png', thumbnail: 'assets/products/CashBox Order 2-4/thumbnails/CashBox Order - Fastfood_2.png', isVideo: false }
    ];

    constructor() { }
    
    getItems() : IGalleryItem[] {
        return this.#install;
    }
}