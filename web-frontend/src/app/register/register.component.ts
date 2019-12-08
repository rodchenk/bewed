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
  		if(!values.email || !values.name || !values.password){
  			this.toast.error('', 'All fields are required', {
	    		progressBar: true,
	       		progressAnimation: 'increasing',
	    		positionClass: 'toast-top-right'
	    	});
	    	return;
  		}
  		console.log(values);
  		this.http.post(this.host + this.service + '/register', {
  			email: values.email,
			username: values.name,
			name: values.name,
			password: values.password,
			confirmpassword: values.password
		}).subscribe((data:any) => {
			console.log(data)
			//this.userProvider.setAuth(data);
			//this.userProvider.LocalStorageManager.setValue('auth_user_data', data);
			//this.loginForm.reset();
		}, error => {
			console.log(error)
			this.toast.error('Registration failed', 'try later', {
	    		progressBar: true,
	       		progressAnimation: 'increasing',
	    		positionClass: 'toast-top-right'
	    	});
		})
  		console.log('register')
  	}

  	ngOnInit() {}
}
