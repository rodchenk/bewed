import { Component } from '@angular/core';
import { UserService } from './user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public isLoading:boolean = false;
	public sidenavEnabled = false;
	public search_string:string = '';

	constructor(public userService: UserService, public dialog: MatDialog){
		console.log(this.userService.isLoggedIn)
	}

	private openLogin(){
		const dialogRef = this.dialog.open(LoginComponent);
		//dialogRef.afterOpened().subscribe( _ => setTimeout( () => this.hideSpinner(), 3000) );
		//dialogRef.afterClosed().subscribe(result =>	console.log('The dialog was closed ' + result));
	}

	public clearSearch(){
		this.search_string = '';
	}

	public showSpinner():void{
		this.isLoading = true;
	}

	public hideSpinner():void{
		this.isLoading = false
	}
}
