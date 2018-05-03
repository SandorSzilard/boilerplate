import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from './data'
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  addData(data): Observable<any> {
    const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post('http://localhost:3000/gradingData', data, cudOptions);
  }

  getEntriesForStudent(id_stud:number):Observable<Data[]>{
    return this.http.get<Data[]>('http://localhost:3000/gradingData?id_stud='+id_stud);
  }

  getEntriesForTeacher(id_subject:number):Observable<Data[]>{
    return this.http.get<Data[]>('http://localhost:3000/gradingData?id_subject='+id_subject);
  }

  updateData(data:Data):Observable<any>{
    return this.http.put('http://localhost:3000/gradingData/'+data.id,data);
  }

}