import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user-service.service';
import { User } from '../../user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  status: string;

  private data: User[] = new Array(50);
  private index: number = 0;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getHeroes().subscribe((res: User[]) => {

      this.data = res;

    });

  }

  onLogClick() {

    if (!(this.username && this.password))
      this.status = "Empty error";
    else {

      this.status = 'Failed login';
      this.data.forEach(element => {
        if ((this.username === element.UN) && (this.password === element.PW)) {
          this.status = 'Hallelujah!';
          let user = JSON.stringify(element);


          this.router.navigate(['/pages/home'], { queryParams:element });
        }


      });



    }
  }
}
