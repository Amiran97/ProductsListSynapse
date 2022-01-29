import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/account/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { CreateReviewRequest } from '../models/create-review-request';
import { CreateReviewResponse } from '../models/create-review-response';
import { Product } from '../models/product';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient,
              private tokenStorage: TokenStorageService) { }

  getAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.apiUrl}/products`);      
  }
  getAllReviewsByProductId(id: number): Observable<Array<Review>> {
    return this.httpClient.get<Array<Review>>(`${this.apiUrl}/reviews/${id}`);      
  }
  createReviewIntoProduct(id: number, review: Review): Observable<CreateReviewResponse> {
    let reviewRequest: CreateReviewRequest = { rate: review.rate, text: review.text };
    let options = {'Authorization' : `${this.tokenStorage.accessToken}`};
    return this.httpClient.post<CreateReviewResponse>(`${this.apiUrl}/reviews/${id}`, reviewRequest, { headers: options });
  }
}
