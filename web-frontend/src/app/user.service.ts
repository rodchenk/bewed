import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class UserService{

	public isLoggedIn: boolean = false;
	public user:any = {user_id:''};

	private auth_key:string = 'user_auth_data'
	private email_key:string = 'user_email'

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

	public setAuth(data:any):void{
		this.LocalStorageManager.setValue(this.auth_key, data);
		this.user = data;
		this._refresh_auth()
	}

  	private _refresh_auth():void{
  		this.isLoggedIn = this.LocalStorageManager.getValue(this.auth_key) ? true : false
  	}

  	public getSavedEmail(){
  		return this.LocalStorageManager.getValue(this.email_key)
  	}

  	/**
  	* @method logs in the user and initializes temp password and token
  	* @use_api POST /login
  	* @redirect after successful registration to /complete-signup
  	*/ 
	public register(values:any){
  		this.http.post(Config.API_AUTH + '/register', {
  			email: 			values.email,
			username: 		values.name,
			name: 			values.name,
			password: 		values.password,
			confirmPassword:values.password
		}).subscribe((data:any) => {
			this.router.navigate(['/complete-signup'])
			this.LocalStorageManager.setValue(this.email_key, values.email)
		}, error => this.showError(error.error.message))
	}

	/**
  	* @method logs in the user and initializes temp password and token
  	* @use_api POST /login
  	* @return Promise<any>
  	*/ 
	public login(values:any):Promise<any>{
		return new Promise((resolve, reject) => {
			this.http.post(Config.API_AUTH + '/login', {
				username: values.name, 
				password: values.password
			}).subscribe((data:any) => {
				this.setAuth(data)
				resolve()
			}, error => {
				this.showError(error.error.message)
				reject()
			})
		})	
	}

  	/**
  	* @method logs out and deauthorizes all user sessions except the current one.
  	* @use_api POST /logout-others
  	* @headers Protected endpoint -> Authorization : "Bearer {token}:{password}"
  	* @return Promise<any>
  	*/ 
  	public logoutOther():Promise<any>{
  		return new Promise((resolve, reject) => {
  			this.http.post(Config.API_AUTH + '/logout-others', {}, { 
  				headers: { "Authorization": 'Bearer ' + this.user.token + ':' + this.user.password } 
  			}).subscribe( success =>  {
  				this.showSuccess('Sessions has been cleaned')
  				resolve()
  			}, error => reject())
  		})
  	}

  	/**
  	* @method logs out every session the user has open and deauthorizes the user completely on all databases
  	* @use_api POST /logout-all
  	* @headers Protected endpoint -> Authorization : "Bearer {token}:{password}"
  	* @return Promise<any>
  	* @unused
  	*/ 
  	public logoutAll():Promise<any>{
  		return new Promise((resolve, reject) => {
  			this.http.post(Config.API_AUTH + '/logout-all', {}, { 
  				headers: { "Authorization": 'Bearer ' + this.user.token + ':' + this.user.password} 
  			}).subscribe( success =>  {
  					this.router.navigate(['/'])
  					resolve()
  				}, error => reject())
  		})
  	}

	/**
	* @method logs out the current session and deauthorizes the token on all user databases
	* @use_api POST /logout
	* @headers Protected endpoint -> Authorization : "Bearer {token}:{password}"
  	* @return Promise<any>
	*/
	public logout():void{
		this.http.post(Config.API_AUTH + '/logout', {}, {
			headers: { "Authorization": 'Bearer ' + this.user.token + ':' + this.user.password}
		}).subscribe( _ => {
			this.isLoggedIn = false;
			this.user = {user_id:''};
			this.LocalStorageManager.remove(this.auth_key)
			this.router.navigate(['/'])
		})
	}

	/**
  	* @method shows error toast with given message
  	*/
  	public showError(message:string):void {
  		this.toast.error(message,'', {
    		progressBar: true,
       		progressAnimation: 'increasing',
    		positionClass: 'toast-top-right'
    	});
  	}

  	/**
  	* @method shows success toast with given message
  	*/
  	public showSuccess(message:string):void {
  		this.toast.success(message,'', {
    		progressBar: true,
       		progressAnimation: 'increasing',
    		positionClass: 'toast-top-right'
    	});
  	}

  	/**
  	* @method gets user data
  	* @use_api GET /user
  	* @return Promise<any>
  	*/
  	public getUserData(user_id?:string):Promise<any>{
  		return new Promise( (resolve, reject) => {
  			this.http.get(Config.API_URL + '/user', {params: { user_id: user_id || this.user.user_id }}).subscribe((user:any) => {
	  			resolve(user)
	  		}, error => reject(error))
  		})
  	}

  	/**
  	* @method saves user data
  	* @use_api PUT /user
  	* @return Promise<any>
  	*/
  	public saveUserData(user):Promise<any>{
  		return new Promise( (resolve, reject) => {
  			this.http.put(Config.API_URL + '/user', {values: user}).subscribe( (data:any) => {
  				resolve(data)
  			}, error => console.warn(error) )
  		})
  	}

	/**
  	* @method changes user password
  	* @params object of old and new password
  	* @use_api POST /password-change
  	* @headers Protected endpoint -> Authorization : "Bearer {token}:{password}"
  	* @return Promise<any>
  	*/  	
  	public changeUserPassword(values:any):Promise<any>{
  		return new Promise( (resolve, reject) => {
  			// TODO 401 unathorized

  			this.http.post(Config.API_AUTH + '/password-change', {
  				currentPassword: values.old_password,
  				newPassword: values.new_password,
  				confirmPassword: values.new_password
  			}, {
  				headers: {
  					"Authorization": "Bearer " + this.user.token + ":" + this.user.password
  				}
  			}).subscribe( (data:any) => {
  				this.showSuccess('Password has been changed')
  				resolve()
  			}, error => {
  				this.showError('An error is occured')
  				reject()
  			})
  			
  		})
  	}
}