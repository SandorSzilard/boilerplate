import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { User } from '../../user';
import { UserService } from '../../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  contact: string;
  UN: string;
  PW: string;
  verifyIfTeacher:boolean;


  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {

  }

  onRegisterClick() {

    let user ={
    name:this.name,
    UN:this.UN,
    PW:this.PW,
    contact:this.PW,
    verifyIfTeacher:this.verifyIfTeacher
    };



    
    
    this.userService.createUser(user).subscribe(res =>{
      this.router.navigate(['/pages/home'], { queryParams:res });
    });

    



  }




}


