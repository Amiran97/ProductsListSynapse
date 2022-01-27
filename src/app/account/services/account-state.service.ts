import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountStateService {

  private user: BehaviorSubject<User>;

  get user$() { return this.user.asObservable(); }

  constructor() { 
    this.user = new BehaviorSubject<User>({username: '', password: ''});
    this.loadAccount();
  }

  setAccount(user: User) : void {
    this.user.next(user);
    this.saveAccount();
  }

  removeAccount() : void {
    this.user.next({username: '', password: ''});
    localStorage.removeItem('username');
  }

  saveAccount() : void {
    localStorage.setItem('username', this.user.getValue().username);
  }

  loadAccount() : void {
    let user: User = {
      username: localStorage.getItem('username') as string,
      password: ''
    };

    if (user.username)
      this.user.next(user);
  }
}
