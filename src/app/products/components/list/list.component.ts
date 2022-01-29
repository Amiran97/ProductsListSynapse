import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountFacadeService } from 'src/app/account/services/account-facade.service';
import { ProductsFacadeService } from '../../services/products-facade.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(
    public productFacade: ProductsFacadeService,
    private accountFacade: AccountFacadeService,
    private router: Router) { }

  onBackClick() {
    this.accountFacade.logout();
    this.router.navigate(['/account/login']);
  } 
}
