import { Injectable } from '@angular/core';
import { find, Observable } from 'rxjs';
import { CreateReviewResponse } from '../models/create-review-response';
import { Product } from '../models/product'; 
import { Review } from '../models/review';
import { ProductsApiService } from './products-api.service';
import { ProductsStorageService } from './products-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacadeService {

  constructor(
    private productApi: ProductsApiService,
    private productStorage: ProductsStorageService) { 
      this.load();
  }

  get products$() {
    return this.productStorage.products$;
  }

  getReviewsByProductId(id: number): Observable<Array<Review>> {
    return this.productApi.getAllReviewsByProductId(id);
  }

  createReviewIntoProduct(id: number, review: Review): Observable<CreateReviewResponse>
  {
    return this.productApi.createReviewIntoProduct(id, review);
  }

  private load() {
    this.productApi.getAllProducts()
      .subscribe(data => this.productStorage.set(data));
  }
}
