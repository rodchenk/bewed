import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  	private registerForm:any
	public hide:boolean = true

  	constructor(private formBuilder: FormBuilder, private userProvider: UserService) {
  		this.registerForm = new FormGroup({
			name: new FormControl(),
			password: new FormControl(),
			email: new FormControl()
		});
  	}

  	onSubmit(values:any){
		this.userProvider.register(values);
  		console.log('register')
  	}

  	ngOnInit() {
  		console.log('register ngoninit');
  	}
}
