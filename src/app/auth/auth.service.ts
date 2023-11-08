import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, tap } from "rxjs";
import { throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../enviroments/enviroment.development";

//* Constants
const FIREBASE_WEB_API_KEY = environment.firebaseApiKey;
const FIREBASE_SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_WEB_API_KEY}`;

const FIREBASE_SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_WEB_API_KEY}`;

export interface IAuthReqData {
  password: string;
  email: string;
  returnSecureToken?: boolean;
}
export interface IAuthResData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered? :boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService {
  currUser = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
    private router: Router){}

  signUpWithEmailPassword(authData: IAuthReqData){
    if (!authData.email || !authData.password) return;
    const authRes = this.http.post<IAuthResData>(FIREBASE_SIGN_UP_URL, {
      ...authData,
      returnSecureToken: true,
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
         this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
          );
       })
    );
  }
  loginWithEmailPassword(authData: IAuthReqData){
    if (!authData.email || !authData.password) return;
    const authRes = this.http.post
    <IAuthResData>(FIREBASE_SIGN_IN_URL, {
      ...authData,
      returnSecureToken: true,
    })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
           resData.email,
           resData.localId,
           resData.idToken,
           +resData.expiresIn
           );
         })
       );
  }

  autoLogin(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        this.currUser.next(loadedUser);
        const expirationDuration = new Date(User.Data_tokenExpirationDate).getTime() - new Date(). getTime();
        this.autoLogout(expirationDuration);
      }
  }

  logout(){
    this.currUser.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout ();
    }, expirationDuration);
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    ) {
    const expirationDate = new Date(
      new Date().getTime() +expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
     );
     this.currUser.next(user);
     this.autoLogin();
     localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist!'
      break;
    case ' INVALID_PASSWORD':
      errorMessage = 'This password is not correct!'
    }
    return throwError(errorMessage);
  }

}
