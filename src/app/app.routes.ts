import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../app/pages/home/home.component').then(c => c.HomePage)
    },
    {
        path: 'sitemap',
        loadComponent: () => import('../app/pages/sitemap/sitemap.component').then(c => c.SitemapComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('../app/pages/contact/contact.component').then(c => c.ContactPage)
    },
    {
        path: 'comparator',
        loadComponent: () => import('../app/pages/comparator/comparator.component').then(c => c.ComparatorPage)
    },
    {
        path: 'monnayeurs-automatiques',
        loadComponent: () => import('../app/pages/monnayeurs-automatiques/monnayeurs.component').then(c => c.CoinChangerPage)
    },
    {
        path: 'bornes-de-commande',
        loadComponent: () => import('../app/pages/bornes-de-commande/bornes-de-commande.component').then(c => c.ControlTerminalPage)
    },
    {
        path: 'product/:id',
        loadComponent: () => import('../app/pages/product/product.component').then(c => c.ProductPage)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
