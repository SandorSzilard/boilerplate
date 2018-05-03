import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {


  constructor(private HttpClient: HttpClient) {

  }

  getHeroes(): Observable<User[]> {

    return this.HttpClient.get<User[]>( 'http://localhost:3000/logindata');

  }

  createUser(user): Observable<any> {

    const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    return this.HttpClient.post('http://localhost:3000/logindata',user,cudOptions);
  }

  getTeachers():Observable<User[]>{
    return this.HttpClient.get<User[]>("http://localhost:3000/logindata?verifyIfTeacher=true");
  }

  getStudents():Observable<User[]>{
    return this.HttpClient.get<User[]>("http://localhost:3000/logindata?verifyIfTeacher=false");
  }

}
