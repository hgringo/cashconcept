import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IProduct } from 'app/types/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ComparatorService {

  private productsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(this.loadProducts());
  public products$: Observable<IProduct[]> = this.productsSubject.asObservable();

  private isBrowser!: boolean;

  constructor() {}

  private loadProducts(): IProduct[] {
    
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  private saveProducts(products: IProduct[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  addProduct(product: IProduct): void {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = [...currentProducts, product];
    this.productsSubject.next(updatedProducts);
    this.saveProducts(updatedProducts);
  }

  removeProduct(productId: string): void {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.filter((product) => product.id !== productId);
    this.productsSubject.next(updatedProducts);
    this.saveProducts(updatedProducts);
  }

  removeAll() {
    this.productsSubject.next([]);
    this.saveProducts([]);
  }

  setProducts(products: IProduct[]): void {
    this.productsSubject.next(products);
    this.saveProducts(products);
  }

  getProducts(): IProduct[] {
    return this.productsSubject.value;
  }
}
