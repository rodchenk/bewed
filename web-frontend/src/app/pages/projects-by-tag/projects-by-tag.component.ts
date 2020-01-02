import { Component, OnInit } from '@angular/core';
import { PoolService } from './../../services/pool.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-projects-by-tag',
  templateUrl: './projects-by-tag.component.html',
  styleUrls: ['./projects-by-tag.component.scss']
})
export class ProjectsByTagComponent implements OnInit {

	private pools:any[] = []

  	constructor(private poolProvider: PoolService, private route: ActivatedRoute) { }

  	ngOnInit() {
  		this.route.params.subscribe( params => {
  			this.poolProvider.getPoolsByTag(params['tag']).then( (data:any) => {
  				console.log(data.rows)
  				if(data.rows){
  					this.pools = data.rows
  				}
  			})
  		})
  	}

}
