import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

	public sidenavEnabled = false;
	public search_string:string = '';
	public user:any = null;

	constructor(public userService: UserService, public dialog: MatDialog){
		console.log(this.userService.isLoggedIn)
	}

	ngOnInit(){ }

	private openLogin(){
		this.dialog.open(LoginComponent);
	}

	onLogout():void{
		this.userService.logout()
	}

	public clearSearch(){
		this.search_string = '';
	}

	explorePremium():void{
		this.userService.showError('Premium not available yet')
	}
}
