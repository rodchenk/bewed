import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PoolModalComponent } from './../pool-modal/pool-modal.component';
import { PoolCategory, PoolCategoryAbstract } from './../../interfaces/pool-category';
import { UserService } from './../../services/user.service';
import { PoolService } from './../../services/pool.service';
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

	public pools:any[] = [];
	public me:string
 	public studio:any = {}
 	public is_mine:boolean = false

  	constructor(private dialog: MatDialog, private userProvider: UserService, private poolProvider: PoolService, private router: Router, private route: ActivatedRoute) { }

    /**
    * @method will be called after constructor. It takes user parameter from URL and looks for its pools in DB
    */
  	ngOnInit() {
  		let user_studio;
  		this.me = this.userProvider.user.user_id

        this.route.params.subscribe( params => {
        	user_studio = params['user'];
        	this.getUserPools(user_studio || this.me)
        });

        this.is_mine = user_studio == this.me

  		this.userProvider.getValues( {values: ['name', 'verified'], user_id: user_studio} ).then( (data:any) => {
  			if(data.length > 0){
  				this.studio = data[0]
  			}
  		})
  	}

  	completed(tasks:any[]):number{
  		return tasks.filter(task => task.status == 3).length
  	}

  	/**
    * @unused
  	* @method gets all pool data from API
  	*/
  	private getPools(){
        this.poolProvider.getAll().then( (pools:any) => {
            this.pools = pools
            this.setCategory()
        }).catch( error => console.warn(error) )
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
  	* @method gets all pool data of given user_id via API
    * @query a view {{poolTasks/all}}
  	*/
  	private getUserPools(user_id:string){
        this.poolProvider.getByUser(user_id).then( (pools:any) => {
            this.pools = pools
            this.setCategory()
        } ).catch( error => console.warn(error) )
  	}

  	/**
  	* @method opens modal dialog with pool form
    * @trigger if modal returns true, then it will update all pools to get new data
  	*/
  	public addPool():void{
  		const dialogRef = this.dialog.open(PoolModalComponent)
  		dialogRef.afterClosed().subscribe((hasAdd:boolean) => {
  			if(hasAdd) this.ngOnInit()
  		})
  	}

  	/**
  	* @method opens the pool on click
    * @redirect to /studio/:pool
  	*/
  	public openPool(pool_id:string):void{
        this.router.navigate(['studio/' + this.userProvider.user.user_id + '/' + pool_id])
  	}

  	private goBack():void{
  		this.router.navigate(['/user/' + this.userProvider.user.user_id])
  	}
}