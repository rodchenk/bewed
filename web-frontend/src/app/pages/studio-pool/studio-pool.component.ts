import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { PoolSettingsComponent } from './../pool-settings/pool-settings.component';
import { PoolCategory, PoolCategoryAbstract } from './../../interfaces/pool-category';
import { PoolService } from './../../services/pool.service';
import { CreateTaskComponent } from './../create-task/create-task.component';
import { TaskService } from './../../services/task.service';

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

	

  	constructor(private poolProvider: PoolService, private taskProvider: TaskService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) { }

  	ngOnInit():void {
  		this.loadPoolData()
  	}

  	openTask(task_id:boolean):void{
  		this.router.navigate(['studio/' + this.pool._id + '/task/' + task_id])
  	}

  	publishPool(shouldPublish:boolean):void{
  		this.pool.published = shouldPublish
  		this.poolProvider.update(this.pool)
  	}

  	/**
	* @method loads pool data by id via API. Id will be taken from URL -> params['pool']
	*/
  	private loadPoolData():void{
  		this.route.params.subscribe( (params:any) => this.poolProvider.getByID(params['pool']).then( (data:any) => {
  			this.pool = data 
  			this.cover = '/assets/img/' + this.pool.category + '.png'
  			//this.loadTasks()

  			this.tasks = data.tasks

			

  		}).catch( error => console.warn(error)) );
  	}


  	/**
  	* @UNUSED
  	*/
  	private loadTasks():void{
  		//this.tasks = data.docs

		this.waiting_tasks = this.tasks.filter(task => task.status == 0)
		this.todo_tasks = this.tasks.filter(task => task.status == 1)
		this.active_tasks = this.tasks.filter(task => task.status == 2)
		this.done_tasks = this.tasks.filter(task => task.status == 3)


  		// this.taskProvider.getTasksByPool(this.pool._id).then( (data:any) => {

  		// 	this.tasks = data.docs

  		// 	this.waiting_tasks = this.tasks.filter(task => task.status == 0)
  		// 	this.todo_tasks = this.tasks.filter(task => task.status == 1)
  		// 	this.active_tasks = this.tasks.filter(task => task.status == 2)
  		// 	this.done_tasks = this.tasks.filter(task => task.status == 3)
  			
  		// }).catch( error => console.log('error by getting tasks'))	
  	}

  	/**
  	* @used in Sidenav
  	* @method opens modal with task creation form
  	*/
  	private newTask():void{
  		let dialog = this.dialog.open(CreateTaskComponent, { data: this.pool } );
  		dialog.afterClosed().subscribe((hasAdded:boolean) => {
  			if(hasAdded){
  				this.loadTasks()
  			}
  		})
  		console.log('new task')
  	}

  	private goBack():void{
  		this.router.navigate(['studio/' + this.pool.user])
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
