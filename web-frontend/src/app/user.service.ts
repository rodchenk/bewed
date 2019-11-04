import { Injectable } from '@angular/core';
import { Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

	public isLoggedIn: boolean = false;
	private auth_key:string = 'user_auth_data'; 

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
		this.router.navigate(['/']);
		this._refresh_auth()
	}

	public logout():void{
		this.LocalStorageManager.remove(this.auth_key)
		this.router.navigate(['/'])
		this._refresh_auth()
	}

  	constructor(private router: Router) {
  		this._refresh_auth()
  	}

  	private _refresh_auth():void{
  		this.isLoggedIn = this.LocalStorageManager.getValue(this.auth_key) ? true : false
  	}
}
