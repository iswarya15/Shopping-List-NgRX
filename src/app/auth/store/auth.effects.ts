import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as AuthActions from './auth.actions';

export interface SignUpResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface LoginResponseData extends SignUpResponseData {
  registered: boolean;
}

const FIREBASE_API_KEY = 'AIzaSyAq5N-qk6S_h9xJ_Z4AsstAzzOuLFt9U_w';

@Injectable()
export class AuthEffects {
  private static readonly loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),

    switchMap((authData: AuthActions.LoginStart) => {
      console.log('Inside Effect ->', authData);
      return this.http.post<LoginResponseData | HttpErrorResponse>(AuthEffects.loginUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true,
      });
    }),

    map((resData: any) => {
      const tokenExpirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
      return of(new AuthActions.Login({ email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: tokenExpirationDate }));
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {} //we get access to all the actions that are dispatched
}
