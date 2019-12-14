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
	public user:any = null;

	private auth_key:string = 'user_auth_data';

	constructor(private router: Router, private toast: ToastrService, private http: HttpClient) {
  		this._refresh_auth();
  		if(this.isLoggedIn){
  			this.user = this.LocalStorageManager.getValue(this.auth_key);
  			console.log(this.user);
  		}

  		console.log(this.LocalStorageManager.getValue(this.auth_key))
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
  		this.http.post(Config.API_AUTH + '/register', {
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
		this.http.post(Config.API_AUTH + '/login', {
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

	/**
  	* @method shows error toast with given message
  	*/
  	public showError(message:string){
  		this.toast.error(message,'', {
    		progressBar: true,
       		progressAnimation: 'increasing',
    		positionClass: 'toast-top-right'
    	});
  	}

  	/**
  	* @method shows success toast with given message
  	*/
  	public showSuccess(message:string){
  		this.toast.success(message,'', {
    		progressBar: true,
       		progressAnimation: 'increasing',
    		positionClass: 'toast-top-right'
    	});
  	}

  	/**
  	* @method gets user data
  	* @use_api GET /user
  	*/
  	public getUserData():Promise<any>{
  		return new Promise( (resolve, reject) => {
  			this.http.get(Config.API_URL + '/user', {params: { user_id: this.user.user_id }}).subscribe((user:any) => {
	  			resolve(user)
	  		}, error => reject(error))
  		})
  	}

  	/**
  	* @method saves user data
  	* @use_api PUT /user
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
