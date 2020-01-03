import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { PoolSettingsComponent } from './../pool-settings/pool-settings.component';
import { PoolCategory, PoolCategoryAbstract } from './../../interfaces/pool-category';
import { PoolService } from './../../services/pool.service';
import { CreateTaskComponent } from './../create-task/create-task.component';
import { UsersListComponent } from './../users-list/users-list.component';
import { TaskService } from './../../services/task.service';
import { UserService } from './../../services/user.service';

@Component({
	selector: 'app-studio-pool',
	templateUrl: './studio-pool.component.html',
	styleUrls: ['./studio-pool.component.scss']
})
/**
* @author Misha Rodchenkov
* @github github.com/rodchenk
*/
export class StudioPoolComponent implements OnInit {

	private pool:any = {name:'', watchers: []};
	private isWatching:boolean
	private cover:string = 'assets/img/3.png'
    public me:string

  	constructor(private poolProvider: PoolService, private taskProvider: TaskService, private userProvider: UserService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) { }

  	ngOnInit():void {
        this.me = this.userProvider.user.user_id
  		this.loadPoolData()
  	}

  	/**
  	* @method switches publish flag and saves it into DB
  	*/ 
  	private publishPool(shouldPublish:boolean):void{
  		this.pool.published = shouldPublish
  		this.poolProvider.update(this.pool).then( (data:any) => { this.pool._rev = data.data.rev } )
  	}

  	private showWatchers():void{
  		this.poolProvider.getPoolWatchers(this.pool._id).then( (data:any) => {
	  		let dialog = this.dialog.open(UsersListComponent, {closeOnNavigation: true, data});
	  		dialog.afterClosed().subscribe( (data:any) => {
	  			console.log(data)
	  		})
  			
  		})
  	}

  	/**
  	* @method navigates view to studio component
  	*/
  	private goBack():void{
  		this.router.navigate(['studio/' + this.pool.user])
  	}

  	/**
  	* @method switches watch-status of current user and saves it into DB
  	*/
  	private watch():void{
  		if(this.isWatching){
  			this.pool.watchers = this.pool.watchers.filter(user => user != this.me)
  		}else{
  			this.pool.watchers.push(this.me)
  		}
  		this.isWatching = !this.isWatching
  		this.poolProvider.update(this.pool).then( (data:any) => this.pool._rev = data.data.rev ).catch( error => console.warn(error) )
  	}

  	/**
	* @method loads pool data by id via API. Id will be taken from URL -> params['pool']
	*/
  	private loadPoolData():void{
  		this.route.params.subscribe( (params:any) => this.poolProvider.getByID(params['pool']).then( (data:any) => {
  			this.pool = data 
  			this.cover = '/assets/img/' + this.pool.category + '.png'
  			if(!this.pool.watchers){
  				this.pool.watchers = []
  				this.isWatching = false
  			}else{
  				this.isWatching = this.pool.watchers.indexOf(this.me) > -1
  			}
  		}).catch( error => console.warn(error)) );
  	}

  	/**
  	* @method opens modal with pool settings
  	* @trigger if modal returns true (saved successful) -> pool data will be requested again to be up-to-date
  	*/
  	private openPoolSettings():void{
  		let dialogRef = this.dialog.open(PoolSettingsComponent, {data: this.pool})
  		dialogRef.afterClosed().subscribe( (isUpdated:boolean) => {
  			if(isUpdated)
  				this.loadPoolData()
  		})
  	}

}
