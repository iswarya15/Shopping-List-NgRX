import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromAppState from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromAppState.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      // Take 1 value from the observable and then immediately unsubscribe
      take(1),
      map((authState) => authState.user),
      // Waits for first Observable (i.e the user Observable) to complete and
      // passes the data through. We then return a new Observable (i.e. the http
      // Observable) which replaces the previous one in the Observable chain.
      switchMap((user) => {
        if (!user) {
          // Do not attach token for login or signup (alteratively could check url)
          return next.handle(request);
        }
        const authRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(authRequest);
      })
    );
  }
}
