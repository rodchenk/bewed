import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { PoolService } from './../../services/pool.service';
import { ActivatedRoute, Router } from "@angular/router";
import { PoolCategory, PoolCategoryAbstract } from './../../interfaces/pool-category';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	private user_id: string
	private isItMe:boolean = false
	private user:any = {name:'', photo: 'default.png'}
	private pools:any[] = []
	private follows:any[] = []

  	constructor(private userProvider: UserService, private route: ActivatedRoute, private router: Router, private poolProvider: PoolService) {
  		console.log('constructor loaded');
  	}

  	ngOnInit() {
  		this.route.params.subscribe( params => {
  			this.userProvider.getUserData( params['id'] ).then( (user:any) => {
  				if(user.docs.length > 0){
  					this.user = user.docs[0]
  					this.isItMe = this.userProvider.user.user_id === this.user._id

            		if(!this.user.photo){
            			this.user.photo = '/assets/img/dpi.png'
            		}

            		this.poolProvider.getPublishedPools(this.user._id).then( (data:any) => {
            			data.map(e => e.tasks = e.tasks.length)
            			this.pools = data
            			this.pools.forEach((pool:any) => {
	        				let result = PoolCategory.categories.filter( (category:PoolCategoryAbstract) => category.value === pool.category)
	        				if(result.length > 0) 
	          					pool.viewCategory = result[0].viewValue
      					})
            		})

	                this.poolProvider.getUserFollows( {user_id: this.user._id} ).then((data:any) => {
	                	if(data.rows){
	                		this.follows = data.rows
	                		this.follows.forEach( (pool:any) => {
	                			let result = PoolCategory.categories.filter( (category:PoolCategoryAbstract) => category.value === pool.value.category)
		        				if(result.length > 0) 
		          					pool.value.category = result[0].viewValue
		                	})
	                		//console.log(data.rows)
	                	}
	                })
          		}
  			});  			
  		});
  	}

  	private openPool(pool_id:string){
  		this.router.navigate(['studio/' + this.user._id + '/' + pool_id])
  	}


}
