import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { LoginComponent } from './../login/login.component';
import { UserService } from './../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  	constructor(private router: Router, private userProvider: UserService) {
  		console.log('logout constructor')
  		this.userProvider.logout();
  		 }

  	ngOnInit() {
  		console.log('logout on init')
  	}

}
