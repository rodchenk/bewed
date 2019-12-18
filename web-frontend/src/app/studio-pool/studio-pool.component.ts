import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { PoolSettingsComponent } from './../pool-settings/pool-settings.component';
import { PoolCategory, PoolCategoryAbstract } from './../pool-category';
import { PoolService } from './../pool.service';

@Component({
  selector: 'app-studio-pool',
  templateUrl: './studio-pool.component.html',
  styleUrls: ['./studio-pool.component.scss']
})
export class StudioPoolComponent implements OnInit {

	private pool:any = {name:''};

  	constructor(private poolProvider: PoolService, private route: ActivatedRoute, private dialog: MatDialog) { }

  	ngOnInit() {
  		this.loadPoolData()
  	}

  	private loadPoolData():void{
  		this.route.params.subscribe( (params:any) => this.poolProvider.getByID(params['pool']).then( (data:any) => this.pool = data ).catch( error => console.warn(error)) );
  	}

  	private openPoolSettings():void{
  		let dialogRef = this.dialog.open(PoolSettingsComponent, {data: this.pool})
  		dialogRef.afterClosed().subscribe( (isUpdated:boolean) => {
  			if(isUpdated)
  				this.loadPoolData()
  		})
  	}

}
