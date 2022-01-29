import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { AccountApiService } from './account-api.service';
import { AccountStateService } from './account-state.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountFacadeService {

  constructor(
    private accountApi: AccountApiService,
    private accountState: AccountStateService,
    private tokenStorage: TokenStorageService
  ) {}

  public get account$() { return this.accountState.user$; }

  isAuthenticated$() : Observable<boolean> {
    return this.account$.pipe(map(account => account ? true : false));
  }

  isAuthenticated() : boolean {
    if(this.tokenStorage.accessToken)
      return true;
    return false;
  }

  register(user: User) : Observable<AuthResponse> {
    return this.accountApi.register(user).pipe(
      tap(response => this.tokenStorage.setTokens(response.token)),
      tap(response => this.accountState.setAccount(user))
    );
  }

  login(user: User) : Observable<AuthResponse> {
    return this.accountApi.login(user).pipe(
      tap(response => this.tokenStorage.setTokens(response.token)),
      tap(response => this.accountState.setAccount(user))
    );
  }

  logout() : void {
    this.tokenStorage.removeTokens();
    this.accountState.removeAccount();
  }
}
