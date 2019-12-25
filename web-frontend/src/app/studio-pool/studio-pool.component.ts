import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { PoolSettingsComponent } from './../pool-settings/pool-settings.component';
import { PoolCategory, PoolCategoryAbstract } from './../pool-category';
import { PoolService } from './../pool.service';
import { CreateTaskComponent } from './../create-task/create-task.component';
import { TaskService } from './../task.service';

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

	private pool:any = {name:''};
	private tasks:any[] = []
	private component:StudioPoolComponent = this
	private cover:string = 'assets/img/3.png'

  	constructor(private poolProvider: PoolService, private taskProvider: TaskService, private route: ActivatedRoute, private dialog: MatDialog) { }

  	ngOnInit():void {
  		this.loadPoolData()
  	}

  	/**
	* @method loads pool data by id via API. Id will be taken from URL -> params['pool']
	*/
  	private loadPoolData():void{
  		this.route.params.subscribe( (params:any) => this.poolProvider.getByID(params['pool']).then( (data:any) => {
  			this.pool = data 
  			this.cover = '/assets/img/' + this.pool.category + '.png'

  			this.loadTasks()

  		}).catch( error => console.warn(error)) );
  	}

  	private loadTasks():void{
  		this.taskProvider.getTasksByPool(this.pool._id).then( (data:any) => {console.log(data.docs);this.tasks = data.docs} ).catch( error => console.log('error by getting tasks'))	
  	}

  	/**
  	* @used in Sidenav
  	* @method opens modal with task creation form
  	*/
  	private newTask():void{
  		let dialog = this.dialog.open(CreateTaskComponent, { data: this.pool._id } );
  		dialog.afterClosed().subscribe((hasAdded:boolean) => {
  			if(hasAdded){
  				this.loadTasks()
  			}
  		})
  		console.log('new task')
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
