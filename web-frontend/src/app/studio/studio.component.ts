import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PoolModalComponent } from './../pool-modal/pool-modal.component';
import { PoolCategory, PoolCategoryAbstract } from './../pool-category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './../user.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
* @TODO setCategory() -> refactoring
*/
export class StudioComponent implements OnInit {

	private host_and_service: string = 'http://127.0.0.1:3000/api'
	public pools:any[] = [];
    private user


  	constructor(private dialog: MatDialog, private http: HttpClient, private userProvider: UserService, private router: Router, private route: ActivatedRoute) { }

  	ngOnInit() {
        this.route.params.subscribe( params => {
            this.getUserPools(params['user'])   
        });
  		
  	}

  	/**
    * @unused
  	* @method gets all pool data from API
  	* @use_api GET /pool/all
    * @TODO move it to PoolProvider
  	*/
  	private getPools(){
  		this.http.get(this.host_and_service + '/pool/all', {}).subscribe( (data:any) => {
  			this.pools = data.docs;
        this.setCategory();
  		}, error => console.warn(error))
  	}

    /**
    * @method switches categoryName with categoryViewName from PoolCategory array
    * @TODO make better feature
    */
    private setCategory(){
      this.pools.forEach((pool:any) => {
        let result = PoolCategory.categories.filter( (category:PoolCategoryAbstract) => category.value === pool.category)
        if(result.length > 0) 
          pool.viewCategory = result[0].viewValue
      })

    }

  	/**
  	* @method gets all pool data of given user_id from API
  	* @use_api GET /pool
    * @TODO move it to PoolProvider
  	*/
  	private getUserPools(user_id:string){
  		this.http.get(this.host_and_service + '/pools', {
  			params: { 
          user_id: user_id
        }
  		}).subscribe( (data:any) => {
  			this.pools = data.docs;
        this.setCategory();
  		}, error => console.warn(error))
  	}

  	/**
  	* @method opens modal dialog with pool creation form
  	*/
  	public addPool(){
  		const dialogRef = this.dialog.open(PoolModalComponent)
  		dialogRef.afterClosed().subscribe((hasAdd:boolean) => {
  			if(hasAdd) this.ngOnInit()
  		})
  	}

  	/**
  	* @method opens the pool on click
    * @redirect to /studio/:pool
  	*/
  	public openPool(pool:any){
  		console.log(pool)
      this.router.navigate(['studio/' + this.userProvider.user.user_id + '/' + pool._id])
  	}
}