import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-studio-pool',
  templateUrl: './studio-pool.component.html',
  styleUrls: ['./studio-pool.component.scss']
})
export class StudioPoolComponent implements OnInit {

	private pool_name:string = ''

  	constructor(private route: ActivatedRoute) { }

  	ngOnInit() {
  		this.route.params.subscribe( params => {
  			this.pool_name = params['pool']			
  		});

  	}

}
