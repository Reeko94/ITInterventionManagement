import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Injectable} from '@angular/core';
import {Customer} from '@app/_models/customer';
import {Observable} from 'rxjs';
import {AbstractControl} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customers`);
  }

  register(formData: { [p: string]: AbstractControl }): Observable<any> {
    const datasObject = {};
    const datas = Object.keys(formData);
    datas.map(key => {
      datasObject[key] = formData[key].value;
    });
    return this.http.post<any>(`${environment.apiUrl}/customer`, datasObject);
  }
}
