import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
	selector: 'app-explore-users',
	templateUrl: './explore-users.component.html',
	styleUrls: ['./explore-users.component.scss']
})
export class ExploreUsersComponent implements OnInit {

	users:any[] = []
	private me:string = ''

  	constructor(private userService: UserService) {
  		this.me = this.userService.user.user_id
  	}

  	ngOnInit() {
  		this.loadUsers()
  	}

  	private loadUsers():void{
  		this.userService.getAll().then( (users:any) => {
  			if(users.length > 0) 
  				this.users = users.filter( (user:any) => user._id !== this.me)

        console.log(this.users)
  		}).catch( error => this.users = [])
  	}

}
