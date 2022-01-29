import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsStorageService {

  private productsList: BehaviorSubject<Array<Product>>;
  
  constructor() {
    this.productsList = new BehaviorSubject<Array<Product>>([]);
  }

  get products$() {
    return this.productsList.asObservable();
  }

  set(products: Array<Product>) {
    this.productsList.next(products);
  }
}
