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
	private isItMe:boolean = false
	private user:any = {name:'', photo: 'default.png'}

  	constructor(private userProvider: UserService, private route: ActivatedRoute, private router: Router) {
  		console.log('constructor loaded');
  	}

  	ngOnInit() {
  		this.route.params.subscribe( params => {
  			this.userProvider.getUserData( params['id'] ).then( (user:any) => {
  				if(user.docs.length > 0){
  					this.user = user.docs[0]
  					this.isItMe = this.userProvider.user.user_id === this.user._id
            		if(!this.user.photo){
            			this.user.photo = '/assets/img/dpi.png'
            		}
          		}
  			});  			
  		});
  	}
}
