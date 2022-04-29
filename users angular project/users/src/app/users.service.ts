import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formdata, User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  url: string = 'https://gorest.co.in/public/v2/users';
  urlForm: string = 'https://test111.free.beeceptor.com/my/api/path'

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`https://gorest.co.in/public/v2/users/${id}`);
  }

  postFormData(data: Formdata) {
    this.http.post(this.urlForm, data);
  }
}
