import { Injectable } from '@angular/core';
import { PoolCategoryAbstract, PoolCategory} from './../interfaces/pool-category';
import { Config } from './../config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  	providedIn: 'root'
})
/**
* @author Misha Rodchenkov
* @github github.com/rodchenk
*/
export class PoolService {

    private readonly ERROR_MESSAGE = 'An error is occured'
  	constructor(private http: HttpClient, private userProvider: UserService, private bar: MatSnackBar) { }

  	/**
  	* @UNUSED
  	* @method gets all pools of all users
  	* @use_api GET /pools/all
  	* @return Promise<any> e.g. Pool data
  	*/
  	public getAll():Promise<any>{
  		return new Promise( (resolve, reject) => this.http.get(Config.API_URL + '/pools/all', {}).subscribe( (data:any) => resolve(data.docs), error => reject(error)) )
  	}

  	/**
  	* @method gets all pools by given author (user_id)
  	* @use_api GET /pools?user_id={id}
  	* @return Promise<any> e.g. Pool data
  	*/
  	public getByUser(user_id:string):Promise<any>{
  		return new Promise( (resolve, reject) => this.http.get(Config.API_URL + '/pools', { params: {user_id} }).subscribe( (data:any) => resolve(data.docs), error => reject(error)) )
  	}

  	/**
  	* @method gets all published pools by given user_id
  	* @user_api GET /pools/published?user_id={id}
  	* @return Promise<any> with array of published pools
  	*/
  	public getPublishedPools(user_id:string):Promise<any>{
  		return new Promise( (resolve, reject) => this.http.get(Config.API_URL + '/pools/published', { params: {user_id} }).subscribe( (data:any) => resolve(data.docs), error => reject(error)) )
  	}

  	/**
  	* @method gets all pool's updates and news, that a given user is watching
  	* @user_api GET /pool/news?user_id={id}
  	* @return Promise<any> with array of pools
  	*/
    public getUserNews(data:{user_id, offset}):Promise<any>{
      	return new Promise( (resolve, reject) => this.http.get(Config.API_URL + '/pool/news', { params: {user_id:data.user_id, offset:data.offset}}).subscribe( (data:any) => resolve(data), error => reject(error)) )
    }

    /**
  	* @method gets all pool's names, that a given user is watching
  	* @user_api GET /pool/follows?user_id={id}
  	* @return Promise<any> with array of pools
  	*/
    public getUserFollows(data: {user_id}):Promise<any>{
    	return new Promise((resolve, reject) => {
    		this.http.get(Config.API_URL + '/pool/follows', { params: {user_id: data.user_id}}).subscribe( (data:any) => resolve(data), error => reject(error))
    	})
    }

    public getPoolsByTag(tag:string):Promise<any>{
    	return new Promise( (resolve, reject) => this.http.get(Config.API_URL + '/pool/tags', { params: {tag} } ).subscribe( (data:any) => resolve(data), error => reject(error)) )
    }

  	/**
  	* @method gets pool data by given pool id
  	* @use_api GET /pool?pool_id={id}
  	* @return Promise<any> e.g. Pool data
  	*/
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

  	/**
  	* @method updates pool in DB
  	* @use_api PUT /pool
  	* @return Promise<void>
  	*/
  	public update(pool:any):Promise<void>{
  		return new Promise( (resolve, reject) => {
  			this.http.put(Config.API_URL + '/pool', {values: pool}).subscribe( 
  				(data:any) => {
	  				this.showSuccess('Pool has been updated')
	  				resolve(data)
  			}, (error:any) => {
	  				this.showError(this.ERROR_MESSAGE) 
	  				reject(error)
  			})
  		})
  	}

  	/**
  	* @method adds pool to DB
  	* @use_api POST /pool
  	* @return Promise<boolean> -> if true, modal window will close and pools data will update
  	*/
  	public add(values:any):Promise<boolean>{
  		if(!values.name || !values.category){
  			this.showError('Name and category required')	
  			return;
  		}
	  	if(values.isprivate == null) 
	  		values.isprivate = false;
      values.created = new Date()

  		return new Promise( (resolve, reject) => this.http.post(Config.API_URL + '/pool', { data: values, user: this.userProvider.user.user_id}).subscribe( data => resolve(true), error => reject(error) ))
  	}

    public delete(values:any):Promise<void>{
        console.log(values)
        return new Promise( (resolve, reject) => {
            this.http.delete(Config.API_URL + '/pool', { params: {
                 _id: values._id, 
                 _rev: values._rev
            }}).subscribe( (data:any) => {
                this.showSuccess('Pool has been deleted')
                resolve()
            }, error => {
                this.showError(this.ERROR_MESSAGE)
                reject()
            })
        })
    }

    public mergeTask(pool:any, task:any):any{
    	let index:number = pool.tasks.findIndex((e:any) => e._id == task._id)
    	if(index < 0)
    		return pool
    	pool.tasks[index] = task
    	return pool;
    }

    public cutTask(pool:any, task:any):any{
    	let index:number = pool.tasks.findIndex((e:any) => e._id == task._id)
    	if(index < 0)
    		return pool
    	pool.tasks.splice(index, 1)
    	return pool
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
