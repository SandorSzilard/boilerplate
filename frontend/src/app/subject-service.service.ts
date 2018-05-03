import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from "./subject"

@Injectable()
export class SubjectService {

  constructor(private http: HttpClient) { }

  getFreeSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>('http://localhost:3000/subjects?id_prof=0');
  }
  getSubjectForTeacher(id_prof: number): Observable<Subject> {
    return this.http.get<Subject>('http://localhost:3000/subjects?id_prof=' + id_prof);
  }
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>('http://localhost:3000/subjects');
  }
  getSubjectById(id:number):Observable<Subject>{
    return this.http.get<Subject>('http://localhost:3000/subjects?id_prof='+id);
  }
  updateSubject(subject:Subject): Observable<any>
  {
    const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put('http://localhost:3000/subjects/'+subject.id,subject);
  }



}
