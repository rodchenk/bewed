import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService{

	public isLoggedIn: boolean = false;
	public user:any = null;

	private auth_key:string = 'user_auth_data';
	private host:string = 'http://127.0.0.1:3000';
	private service:string = '/auth';

	constructor(private router: Router, private toast: ToastrService, private http: HttpClient) {
  		this._refresh_auth();
  		if(this.isLoggedIn){
  			this.user = this.LocalStorageManager.getValue(this.auth_key);
  			console.log(this.user);
  		}
  	}

	private LocalStorageManager:any = {
	    setValue: function(key, value) {
	        window.localStorage.setItem(key, JSON.stringify(value));
	    },
	    getValue: function(key) {
	        try {
	            return JSON.parse(window.localStorage.getItem(key));
	        } catch (e) {
	        	console.error('getValue() -> No item found with key ' + key + ': ' + e)
	        }
	    },
	    remove: function(key) {
	    	try{
	    		window.localStorage.removeItem(key);
	    	}catch(e){
	    		console.error('remove() -> No item found with key ' + key + ': ' + e)
	    	}
	    }
	};

	public register(values:any){
		if(!values.email || !values.name || !values.password){
  			this.showError('All fields are required');
	    	return;
  		}
  		console.log(values);
  		this.http.post(this.host + this.service + '/register', {
  			email: 			values.email,
			username: 		values.name,
			name: 			values.name,
			password: 		values.password,
			confirmPassword:values.password
		}).subscribe((data:any) => {
			this.router.navigate(['/'])
		}, error => this.showError(error.error.message))
	}

	public login(values:any){
		if(!values.password || !values.name){
			this.showError('All fields are required')	
			return;
		}
		console.log(values)
		this.http.post(this.host + this.service + '/login', {
			username: values.name, 
			password: values.password
		}).subscribe((data:any) => {
			this.setAuth(data);
		}, error => this.showError(error.error.message))
	}

	public setAuth(data:any):void{
		this.LocalStorageManager.setValue(this.auth_key, data);
		this.router.navigate(['/']);
		this._refresh_auth()
	}

	public logout():void{
		this.LocalStorageManager.remove(this.auth_key)
		this.user = null;
		this.router.navigate(['/'])
		this._refresh_auth()
	}

  	private _refresh_auth():void{
  		this.isLoggedIn = this.LocalStorageManager.getValue(this.auth_key) ? true : false
  	}

  	private showError(message:string){
  		this.toast.error(message,'', {
    		progressBar: true,
       		progressAnimation: 'increasing',
    		positionClass: 'toast-top-right'
    	});
  	}
}
