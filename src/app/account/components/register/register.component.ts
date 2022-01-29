import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmValidator } from 'src/app/core/validators/confirm.validator';
import { AccountFacadeService } from '../../services/account-facade.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  get username() { return this.registerForm?.get('username'); }
  get password() { return this.registerForm?.get('password'); }
  get confirmPassword() { return this.registerForm?.get('confirmPassword'); }

  constructor(
    private accountFacade: AccountFacadeService,
    private router: Router) {
      this.registerForm = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required])
      }, {validators: [ConfirmValidator.sameValues('password', 'confirmPassword')], updateOn: 'change'});
     }

  ngOnInit() {
    
  }

  onSubmit() {
    if(this.registerForm.valid)
    {
      this.accountFacade.register(this.registerForm.value).subscribe(
        authResponse => {
          if(authResponse.success)
            this.router.navigate(['/products/list']);
          else
            this.registerForm.setErrors({invalid: authResponse.message});
        },
        error => {
          console.error(error);
          this.router.navigate(['/error']);
        }
      );
    }
  }
}
