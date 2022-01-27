import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  get accessToken() { return localStorage.getItem('accessToken'); }

  constructor() { }

  setTokens(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  removeTokens() {
    localStorage.removeItem('accessToken');
  }
}
