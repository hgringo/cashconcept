import { Injectable } from '@angular/core';
import { ICustomer } from 'app/types/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    customers: ICustomer[] = [
        { name: 'Domino\'s Pizza', url: 'assets/customers/dominos-pizza.svg' },
        { name: 'API', url: 'assets/customers/API.svg' },
        { name: 'SPAR', url: 'assets/customers/spar.svg' },
        { name: 'Gulli Parc', url: 'assets/customers/Gulli Parc.svg' },
        { name: 'Randy Market', url: 'assets/customers/Randy Market.png' },
        { name: 'Maki Time', url: 'assets/customers/Maki Time.png' },
        { name: 'R.J.S.T', url: 'assets/customers/R.J.S.T.jpg' },
        { name: 'Le Théâtre du pain', url: 'assets/customers/Le Theatre du pain.png' },
        { name: 'Friterie Momo', url: 'assets/customers/Friterie MOMO.jpg' },
        { name: 'VocliDental', url: 'assets/customers/VocliDental.png' },
        { name: 'Exhibition Hub', url: 'assets/customers/Exhibition Hub.png' },
        { name: 'Aux Délices', url: 'assets/customers/Aux délices.jpg' },
        { name: 'Reyhan Supermarché', url: 'assets/customers/Reyhan supermarche.png' },
        { name: 'Giga Fit', url: 'assets/customers/Giga Fit.jpg' },
        { name: 'Jurassic Adventure', url: 'assets/customers/Jurassic Adventure.webp' },
        { name: 'Chef Yusuf', url: 'assets/customers/Ched Yusuf.jpg' },
        { name: 'Bambou', url: 'assets/customers/Bambou.png' },
        { name: 'Fox Padel', url: 'assets/customers/Fox Padel.png' },
        { name: 'Dolce Onorio', url: 'assets/customers/Dolce Onorio.jpg' },
        { name: 'Commune de Tubize', url: 'assets/customers/Commune de Tubize.png' },
        { name: 'Royal Foot Indoor', url: 'assets/customers/Royal Foot Indoor.png' },
        { name: 'Atomic Padel', url: 'assets/customers/ATOMIC PADEL.png' },
        { name: 'Boulangerie Mahy', url: 'assets/customers/Boulangerie Mahy.png' },
    ];

    getCustomers() : ICustomer[] {
        return this.customers;
    }
  
}
