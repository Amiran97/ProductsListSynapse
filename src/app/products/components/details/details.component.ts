import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AccountFacadeService } from 'src/app/account/services/account-facade.service';
import { Product } from '../../models/product';
import { Review } from '../../models/review';
import { ProductsFacadeService } from '../../services/products-facade.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  product: Product = { id: NaN, img: '', text: '', title: '' };
  reviews: Array<Review> = new Array<Review>();
  reviewForm: FormGroup;

  get text() { return this.reviewForm?.get('text'); }
  get rate() { return this.reviewForm?.get('rate'); }

  constructor(public productFacade: ProductsFacadeService,
              private route: ActivatedRoute,
              private router: Router,
              private accountFacade: AccountFacadeService) { 
                this.reviewForm = new FormGroup({
                  text: new FormControl(null, [Validators.required,
                    Validators.minLength(3)]),
                  rate: new FormControl(null, [Validators.required]),
                });
              }

  ngOnInit() {
    let id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string );
    this.productFacade.products$.subscribe(ps=>{
      this.product = ps.find(p=>p.id === id) as Product;
      this.productFacade.getReviewsByProductId(id).subscribe(data=>this.reviews = data);
    });
  }

  onSubmit() {
    if(this.reviewForm.valid) {
      this.productFacade.createReviewIntoProduct(this.product.id, this.reviewForm.value).subscribe(
        authResponse => {
          if(authResponse.review_id)
            this.productFacade.getReviewsByProductId(this.product.id).subscribe(data=>this.reviews = data);
        },
        error => {
          console.error(error);
          this.router.navigate(['/error']);
        }
      );
    }
  }
  onBackClick() {
    this.accountFacade.logout();
    this.router.navigate(['/account/login']);
  } 
  onListClick() {
    this.router.navigate(['/products/list']);
  }
}
