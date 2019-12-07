import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  	private registerForm:any
	public hide:boolean = true
	private host:string = 'http://127.0.0.1:3000'
	private service:string = '/auth'

  	constructor(private formBuilder: FormBuilder, private http: HttpClient, private toast: ToastrService, private userProvider: UserService) {
  		this.registerForm = new FormGroup({
			name: new FormControl(),
			password: new FormControl(),
			email: new FormControl()
		});
  	}

  	onSubmit(values:any){
  		if(!values.email || !values.name || !values.password) return;
  		console.log('register')
  	}

  	ngOnInit() {}
}
