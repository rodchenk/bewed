import { Injectable } from '@angular/core';
import { PoolCategoryAbstract, PoolCategory} from './pool-category';
import { Config } from './config';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service'

@Injectable({
  	providedIn: 'root'
})
export class PoolService {

  	constructor(private http: HttpClient, private toast: ToastrService, private userProvider: UserService) { }

  	public getByID(pool_id):Promise<any>{
  		return new Promise( (resolve, reject) => {
  			this.http.get(Config.API_URL + '/pool', { params: {pool_id}} ).subscribe( (data:any) => {
  				if(data.docs.length > 0){
	  				let pool = data.docs[0]
	  				let result = PoolCategory.categories.filter( (category:PoolCategoryAbstract) => category.value === pool.category)
	        		if(result.length > 0) 
	          			pool.viewCategory = result[0].viewValue
	          		resolve(pool)
	          	}else{
	          		reject()
	          	}
  			}, error => reject(error))
  		})
  	}

  	public update(pool:any):Promise<any>{
  		console.log('pool service')
  		return new Promise( (resolve, reject) => {
  			this.http.put(Config.API_URL + '/pool', {values: pool}).subscribe( 
  				(data:any) => {
	  				this.showSuccess('Pool has been updated')
	  				resolve()
  			}, (error:any) => {
	  				this.showError('An error occurs') 
	  				reject()
  			})
  		})
  	}

  	public add(values:any):Promise<any>{
  		return new Promise( (resolve, reject) => {
	  		if(!values.name || !values.category){
	  			this.showError('Name and category required')	
	  			return;
	  		}
	  		if(values.isprivate === null) 
	  			values.isprivate = false;
	  		this.http.post(Config.API_URL + '/pool', {
	  			data: values,
	  			user: this.userProvider.user.user_id
	  		}).subscribe(
				data => resolve(true), 
				error => {
					console.warn(error); 
					reject()
				}
			)
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
}
