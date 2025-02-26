import { IProduct } from "./product";

export interface IfinancingProduct {
    product : IProduct;
    items : number;
}

export interface formattedFinancingProduct {
    Name: string;
    Price: number;
    Items: number;
}