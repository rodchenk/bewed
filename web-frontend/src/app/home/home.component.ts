import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	public cards:any;
  	constructor(public userProvider: UserService) { }

  	ngOnInit() {
  		
  	}

}