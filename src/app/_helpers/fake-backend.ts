import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
import * as customers from './customers.json';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute(){
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/customers') && method === 'GET':
                  return getCustomers();
              case url.endsWith('/customer') && method === 'POST':
                  return addCustomer(body);
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate(): Observable<HttpResponse<any>> {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) { return error('Username or password is incorrect'); }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            });
        }

        function getUsers(): Observable<HttpResponse<any>> {
            if (!isLoggedIn()) { return unauthorized(); }
            return ok(users);
        }

        function getCustomers(): Observable<HttpResponse<any>> {
          if (!isLoggedIn()) { return unauthorized(); }
          return ok(customers.default);
        }

        function addCustomer(data): Observable<HttpResponse<any>> {
          if (!isLoggedIn()) { return unauthorized(); }
          const c = customers.default;
          data.id = 12;
          c.push(data);
          return created();
        }
        // helper functions

        function created(): Observable<HttpResponse<any>> {
          return of(new HttpResponse({status: 201}));
      }

        function ok(body?: object): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
