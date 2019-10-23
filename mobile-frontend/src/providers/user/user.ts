import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

	private host:string = 'localhost:3000/';

  	constructor(public http: HttpClient) {
    	console.log('Hello UserProvider Provider');
  	}

  	public getUser(){
  		return new Promise((resolve) => {
  			this.http.get('http://localhost:3000/test').subscribe(data => {
	  			console.log(data);
	  			resolve(data);
	  		});
  		});	
  	}
}

