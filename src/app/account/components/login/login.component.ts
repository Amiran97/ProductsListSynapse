import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountFacadeService } from '../../services/account-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  get username() { return this.loginForm?.get('username'); }
  get password() { return this.loginForm?.get('password'); }

  constructor(
    private accountFacade: AccountFacadeService,
    private router: Router) {
      this.loginForm = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
      });
     }

  ngOnInit() {
    
  }

  onSubmit() {
    this.accountFacade.login(this.loginForm.value).subscribe(
      user => {
        this.router.navigate(['/products/list']);
      },
      error => {
        console.error(error);
      }
    );
  }

}
