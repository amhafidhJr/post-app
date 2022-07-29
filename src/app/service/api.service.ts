import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/api/coupons';

  constructor(private http: HttpClient) {}

  postCoupon(data: any) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http.post<any>(this.baseUrl, data, { headers: headers });
  }
  getCoupons() {
    return this.http.get<any>(this.baseUrl);
  }

  putCoupon(data: any, id: number) {
    return this.http.post<any>('http://127.0.0.1:8000/api/coupons/' + id, data);
  }

  deleteCoupon(id: number) {
    return this.http.delete<any>('http://127.0.0.1:8000/api/coupons/' + id);
  }
}
