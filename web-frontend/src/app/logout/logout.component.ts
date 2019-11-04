import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './../login/login.component';
import { UserService } from './../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  	constructor(private userProvider: UserService) {}

  	ngOnInit() {
  		this.userProvider.logout();
  	}

}
