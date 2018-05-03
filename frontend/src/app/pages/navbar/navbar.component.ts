import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { Subject } from '../../subject';
import { SubjectService } from '../../subject-service.service';
import { HomeComponent } from '../home/home.component';
import { parse } from 'querystring';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser: User;
  displayString: String;
  subject: Subject;
  executeSubjectUpdate: boolean = true;
  constructor(private thisRoute: ActivatedRoute, private SubjectService: SubjectService) { }
  
  @ViewChild(HomeComponent) home: HomeComponent;
  ngOnInit() {
    this.thisRoute.queryParams.subscribe(user => {

      let parsedBool:boolean;
      switch(user.verifyIfTeacher){
        case "true":{
          parsedBool = true;
          break;
        }
        case "false":{
          parsedBool =false;
        }
      }
      this.loggedUser = new User(user.id,user.name,user.contact,parsedBool,user.UN,user.PW);
      this.home.loggedUser = this.loggedUser;
      this.displayString = this.displayNameAndSubject();
     

      
      if (this.loggedUser.verifyIfTeacher)
        this.SubjectService.getSubjectForTeacher(this.loggedUser.id).subscribe((res: Subject) => {
           if (this.executeSubjectUpdate) {
            this.subject = res[0];
            this.home.subject = res[0];
            this.home.getTeachedCurse();
            this.home.getFreeSubjects();
            this.home.getEntriesForLoggedTeacher();
            this.displayString = this.displayNameAndSubject();
            this.executeSubjectUpdate = false;
           }
        });
    });

  }

  displayNameAndSubject(): string {
    let returnedString: string;

    if (this.loggedUser.verifyIfTeacher) {
      if (!(this.subject === undefined)) {
        returnedString = "Logged in as " + this.loggedUser.name + " and you are teaching " + this.subject.name;
      } else
        returnedString = "Logged in as " + this.loggedUser.name + " and you are teaching nothing at the moment";

    }
    else {
      returnedString = "Logged in as " + this.loggedUser.name;
    }
    return returnedString;
  }

}
