import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from "@angular/router";

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class LoginComponent implements OnInit {

	private loginForm:any
	public hide:boolean = true
	public sidenavEnabled = true
	private readonly message_required_fields = 'All fields are required'

	constructor(private router: Router, private formBuilder: FormBuilder, private userProvider: UserService, private dialog: MatDialogRef<LoginComponent>) {
		if(this.userProvider.isLoggedIn)
			this.router.navigate(['/'])
	}

	/**
	* @method is called after login form submition. Send login data to userProvider.login() function
	*/ 
	onSubmit(values:any):void {
		if(!values.password || !values.name)
			this.userProvider.showError(this.message_required_fields)

		this.userProvider.login(values).then( _ => this.close() ).catch( error => console.warn(error) );
	}

	/**
	* @method closes a modal window
	*/
	close():void {
		this.dialog.close()
	}

	ngOnInit():void {
		this.loginForm = new FormGroup({
			name: new FormControl(),
			password: new FormControl()
		});
	}

}
