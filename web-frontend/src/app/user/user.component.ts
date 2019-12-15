import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	public title:string = 'User'
	
  	constructor(private userProvider: UserService) {
  		console.log('constructor loaded');
  	}

  	ngOnInit() {
  		console.log('user loaded');
  	}

}
