import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { PoolSettingsComponent } from './../pool-settings/pool-settings.component';
import { PoolCategory, PoolCategoryAbstract } from './../pool-category';
import { PoolService } from './../pool.service';
import { CreateTaskComponent } from './../create-task/create-task.component';

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
	private component:StudioPoolComponent = this
	private cover:string = 'assets/img/3.png'

  	constructor(private poolProvider: PoolService, private route: ActivatedRoute, private dialog: MatDialog) { }

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
  		}).catch( error => console.warn(error)) );
  	}

  	/**
  	* @used in Sidenav
  	* @method opens modal with task creation form
  	*/
  	private newTask():void{
  		let dialog = this.dialog.open(CreateTaskComponent, { data: this.pool._id } );
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
