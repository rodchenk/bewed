import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private loginForm:any
	public hide:boolean = true
	private host:string = 'http://127.0.0.1:3000'
	private service:string = '/auth'

	constructor(private formBuilder: FormBuilder, private http: HttpClient, private toast: ToastrService, private userProvider: UserService) {
		this.loginForm = new FormGroup({
			name: new FormControl(),
			password: new FormControl()
		});
	}

	onSubmit(values:any){
		if(!values.password || !values.name)
			return;
		console.log(values)
		this.http.post(this.host + this.service + '/login', {
			username: values.name, 
			password: values.password
		}).subscribe((data:any) => {
			console.log(data)
			this.userProvider.setAuth(data);
			//this.userProvider.LocalStorageManager.setValue('auth_user_data', data);
			//this.loginForm.reset();
		}, error => {
			console.log(error)
			this.toast.error('Login failed', 'Name of password incorrect', {
	    		progressBar: true,
	       		progressAnimation: 'increasing',
	    		positionClass: 'toast-top-right'
	    	});
		})
	}

	ngOnInit() {}

}
