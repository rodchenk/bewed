import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

	public sidenavEnabled = false;
	public search_string:string = '';
	public user:any = null;
	public photo:string = '/assets/img/dpi.png'

	constructor(public userService: UserService, public dialog: MatDialog){
		console.log(this.userService.isLoggedIn)
	}

	ngOnInit(){
		if(this.userService.isLoggedIn){
			this.userService.getUserImage().then( (data:any) => {
				if(data.docs.length > 0){
					if(!data.docs[0].photo){
						this.userService.user.photo = this.photo
					}else{
						this.userService.user.photo = data.docs[0].photo
					}
				}
			}).catch( e => console.warn('no image'))
		}
	}

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
