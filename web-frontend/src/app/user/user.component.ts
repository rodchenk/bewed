import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	private user_id: string
	private user:any = {name:''}

  	constructor(private userProvider: UserService, private route: ActivatedRoute) {
  		console.log('constructor loaded');
  	}

  	ngOnInit() {
  		// this.route.params.subscribe( params => {
  		// 	this.userProvider.getUserData( params['id'] ).then( (user:any) => { // get user via http from API with ID from URL 
  		// 		if(user.docs.length > 0)
  		// 			this.user = user.docs[0]
  		// 	});  			
  		// });
  	}
}
