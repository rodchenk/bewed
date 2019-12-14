import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private loginForm:any
	public hide:boolean = true
	public sidenavEnabled = true;

	constructor(private formBuilder: FormBuilder, private userProvider: UserService, private dialog: MatDialogRef<LoginComponent>) {
		if(this.userProvider.isLoggedIn){
			console.warn('redirecting')	
		}
	}

	onSubmit(values:any){
		this.userProvider.login(values).then( _ => this.close() ).catch( error => console.warn(error) );
	}

	close(){
		this.dialog.close()
	}

	ngOnInit() {
		this.loginForm = new FormGroup({
			name: new FormControl(),
			password: new FormControl()
		});
	}

}
