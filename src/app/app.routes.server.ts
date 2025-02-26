import { RenderMode, ServerRoute } from '@angular/ssr';
import { ProductService } from './services/product.service';
import { inject } from '@angular/core';
import { IProduct } from './types/product';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client,
  },
  {
      path: 'sitemap',
      renderMode: RenderMode.Prerender,
  },
  {
      path: 'contact',
      renderMode: RenderMode.Prerender,
  },
  {
      path: 'simulation-financement',
      renderMode: RenderMode.Prerender,
  },
  {
      path: 'comparator',
      renderMode: RenderMode.Prerender,
  },
  {
      path: 'monnayeurs-automatiques',
      renderMode: RenderMode.Prerender,
  },
  {
      path: 'bornes-de-commande',
      renderMode: RenderMode.Prerender,
  },
  {
    path: 'product/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams(): Promise<Array<Record<string, string>>> {
      
      const products : IProduct[] = await inject(ProductService).getProducts();
      return products.map((product: IProduct) => ({ id: product.id }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
