import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from './../../../services/pool.service';

@Component({
  selector: 'app-layout-gallery',
  templateUrl: './layout-gallery.component.html',
  styleUrls: ['./layout-gallery.component.scss']
})
export class LayoutGalleryComponent implements OnInit {

	@Input() private pool_id:string
	private pool:any = {tasks:[]}

  	constructor(private poolProvider: PoolService) { }

  	ngOnInit() {
  		this.poolProvider.getByID(this.pool_id).then( (data:any) => {
  			this.pool = data
  		})
  	}

}
