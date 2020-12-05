import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Injectable} from '@angular/core';
import {Customer} from '@app/_models/customer';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customers`);
  }
}
