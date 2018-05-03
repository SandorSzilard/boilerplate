import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { Subject } from '../../subject';
import { Data } from '../../data';
import { DataService } from '../../data-service.service';
import { SubjectService } from '../../subject-service.service';
import { UserService } from '../../user-service.service';
import { element } from 'protractor';
import { DataDetailsStudent } from '../../data-detalis-student';
import { DataDetailsTeacher } from '../../data-details-teacher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  subjects: Subject[];
  subject: Subject;
  selectedSubject: Subject;
  selectedTeacherSubject: Subject;
  freeSubjects: Subject[] = [];
  gradingData: Data[] = [];
  unatendedSubjects: Subject[] = [];
  teachers: User[] = [];
  isTeaching: boolean = true;
  loggedUser: User;
  teacherSubject: Subject;
  subjectOption: Subject;
  gradingDataLoaded: boolean = false;
  dataDetalis: DataDetailsStudent[] = [];
  gradingDataTeachers:DataDetailsTeacher[] =[];
  teachersStudents:User[] =[];
  teachersSelectedStudent:User;
  newGrade:number;

  constructor(private thisRoute: ActivatedRoute, private dataService: DataService, private subjectsService: SubjectService,
    private UserService: UserService) {}

  ngOnInit() {
  
    if (!this.loggedUser.verifyIfTeacher) {
      this.UserService.getTeachers().subscribe((_teachers: User[]) => {
        this.teachers = _teachers;

        this.subjectsService.getSubjects().subscribe((res: Subject[]) => {
          res.forEach(element => {
            this.unatendedSubjects.push(element);
          });
          this.subjects = res;
          this.getEntriesForLoggedStudent();
        });
      });
    }
    
  }


  getEntriesForLoggedStudent() {
    this.dataService.getEntriesForStudent(this.loggedUser.id).subscribe((_gradingData: Data[]) => {
      if (_gradingData.length > 0) {
        let unatSubjectsAux: Subject[] = [];
        this.unatendedSubjects.forEach((element: Subject) => {

          let isContained: boolean = false;

          let dataDetalisIndex: number = 0;

          _gradingData.forEach((data: Data) => {
            if (data.id_subject == element.id) {
              isContained = true;
              this.dataDetalis.push(new DataDetailsStudent(this.diplaySubjectName(data), this.displayTeacherName(data), data.note));
            }
            dataDetalisIndex++;
          });
          if (!isContained) {
            unatSubjectsAux.push(element);
          }
        });
        this.gradingData = _gradingData;
        this.unatendedSubjects = unatSubjectsAux;
      }
      this.gradingDataLoaded = true;
    });
  }

  getEntriesForLoggedTeacher(){
    this.dataService.getEntriesForTeacher(this.subject.id).subscribe((_gradingData:Data[])=>{
      
      this.UserService.getStudents().subscribe((_students:User[])=>{
        _gradingData.forEach((_data:Data)=>{
          _students.forEach((_student:User) =>{
            if(_data.id_stud == _student.id){
              this.gradingDataTeachers.push(new DataDetailsTeacher(_student.name,_data.note));
              this.teachersStudents.push(_student);
            }
          });
        });
      });
      this.gradingData = _gradingData;
    });
  }

  getFreeSubjects() {
    this.subjectsService.getFreeSubjects().subscribe((_freeSubjects: Subject[]) => {
      this.freeSubjects = _freeSubjects;

    });
  }
  getTeachedCurse() {

    if (this.subject === undefined)
      this.isTeaching = false;

  }
  onSelectSubjectClick() {

 

    if (!(this.loggedUser.verifyIfTeacher)) {
      if (!(this.selectedSubject === null) || (this.selectedSubject === undefined)) {
        let _data = {
          id_subject: this.selectedSubject.id,
          id_stud: this.loggedUser.id,
          note: 0

        };
        this.dataService.addData(_data).subscribe(res => {
          window.location.reload();
        });

      }

    }
    else {

      this.selectedTeacherSubject.id_prof = this.loggedUser.id;
      this.subjectsService.updateSubject(this.selectedTeacherSubject).subscribe(res => {
        window.location.reload();

      });

    }

  }

  diplaySubjectName(data: Data): string {
    let returnString: string;
    this.subjects.forEach(_subject => {
      if (_subject.id == data.id_subject)
        returnString = _subject.name;
    });

    return returnString;


  }

  displayTeacherName(data: Data): string {
    let returnString: string;

    this.subjects.forEach(_subject => {
      if (data.id_subject == _subject.id)
        this.teachers.forEach(_teacher => {
          if (_subject.id_prof == _teacher.id)
            returnString = _teacher.name;
        });
    });

    return returnString;
  }

  getIsTeaching(): boolean {

    return this.isTeaching;
  }

  updateGrade(){
    this.gradingData.forEach(_data=>
    {
      if(_data.id_stud == this.teachersSelectedStudent.id){
        _data.note = this.newGrade;
        this.dataService.updateData(_data).subscribe(res=>{
          window.location.reload();
        });
      }
    });
  }


}