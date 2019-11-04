import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public isLoading:boolean = true;

	public showSpinner():void{
		this.isLoading = true;
	}

	public hideSpinner():void{
		this.isLoading = false
	}

	constructor(public userService: UserService){
		console.log(this.userService.isLoggedIn)
	}
}
