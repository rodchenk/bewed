import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from './../../../services/pool.service';
import { UploadPhotoComponent } from './../../../pages/upload-photo/upload-photo.component';
import { GalleryUnitComponent } from './../../../pages/gallery-unit/gallery-unit.component';
import { MatDialog } from '@angular/material/dialog';
import { Helper } from './../../../helper';
import { GalleryTypes } from './../../../interfaces/gallery-types';

@Component({
  selector: 'app-layout-gallery',
  templateUrl: './layout-gallery.component.html',
  styleUrls: ['./layout-gallery.component.scss']
})
export class LayoutGalleryComponent implements OnInit {

	@Input() private pool_id:string
	private pool:any = {tasks:[]}

  	constructor(private poolProvider: PoolService, private dialog: MatDialog) { }

  	ngOnInit() {
  		this._loadPoolData()
  	}

  	private _loadPoolData():void{
  		this.poolProvider.getByID(this.pool_id).then( (data:any) => {
  			this.pool = data
  		})
  	}

  	addUnit():void{
  		let dialog = this.dialog.open(UploadPhotoComponent, {data: {image: null}})
  		dialog.afterClosed().subscribe((data:any) => {
  			if(data){
  				let task = {
  					_id: Helper.gen_random(),
  					image: data,
  					comments: [],
  					likes: []
  				}
  				this.pool.tasks.push(task)
  				this.poolProvider.update(this.pool).catch(error => console.warn(error))
  			}
  		})
  	}

  	openUnit(unit_id:string):void{
  		let dialog = this.dialog.open(GalleryUnitComponent, {data: {type: GalleryTypes.PHOTO_WITH_COMMENTS_LIKES, unit: unit_id, pool: this.pool}} )
  		dialog.afterClosed().subscribe((data:any) => {
  			if(data) this.pool = data
  		})
  	}

}
