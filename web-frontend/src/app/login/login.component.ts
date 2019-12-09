import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private loginForm:any
	public hide:boolean = true
	public sidenavEnabled = true;

	constructor(private formBuilder: FormBuilder, private userProvider: UserService) {
		this.loginForm = new FormGroup({
			name: new FormControl(),
			password: new FormControl()
		});
	}

	onSubmit(values:any){
		this.userProvider.login(values);
	}

	ngOnInit() {}

}
