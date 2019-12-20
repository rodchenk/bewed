import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
	selector: 'app-explore-users',
	templateUrl: './explore-users.component.html',
	styleUrls: ['./explore-users.component.scss']
})
export class ExploreUsersComponent implements OnInit {

	users:any[] = []

  	constructor(private userService: UserService) { }

  	ngOnInit() {
  		this.loadUsers()
  	}

  	private loadUsers():void{
  		this.userService.getAll().then( (users:any) => this.users = users).catch( error => this.users = [])
  	}

}
