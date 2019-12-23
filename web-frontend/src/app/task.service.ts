import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Config } from './config'

@Injectable({
  	providedIn: 'root'
})
export class TaskService {

  	constructor(private http: HttpClient, private bar: MatSnackBar, private router: Router) { }

  	saveTask(task:any):Promise<any>{
  		return new Promise( (resolve, reject) => {
  			this.http.post(Config.API_URL + '/task', {params: task}).subscribe( (data:any) => {
  				this.showSuccess('Task has been saved')
  				resolve(data)
  			}, (error:any) => {
  				this.showError('An error is occured')
  				reject(error) 
  			})  			
  		})
  	}

  	/**
  	* @method shows error toast with given message
  	*/
  	public showError(message:string):void {
  		this.bar.open(message, 'Close', {
  			duration: 3000,
  			panelClass: 'error',
  			horizontalPosition: 'right',
  			verticalPosition: 'top'
		});
  	}

  	/**
  	* @method shows success toast with given message
  	*/
  	public showSuccess(message:string):void {

  		this.bar.open(message, 'Close', {
  			duration: 3000,
  			panelClass: 'success',
  			horizontalPosition: 'right',
  			verticalPosition: 'top'
		});
  	}
}
