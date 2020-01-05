import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { PoolService } from './../../services/pool.service';

@Component({
	selector: 'app-explore-users',
	templateUrl: './explore-users.component.html',
	styleUrls: ['./explore-users.component.scss']
})
export class ExploreUsersComponent implements OnInit {

	users:any[] = []
	pools:any[] = []
	top_pools:any = []
	private me:string = ''

  	constructor(private userService: UserService, private poolProvider: PoolService) {
  		this.me = this.userService.user.user_id
  	}

  	ngOnInit() {
  		this.loadUsers()
  		this.loadPools()

  	}

  	private loadUsers():void{
  		this.userService.getAll().then( (users:any) => {
  			if(users.length > 0) 
  				this.users = users.filter( (user:any) => user._id !== this.me)

        console.log(this.users)
  		}).catch( error => this.users = [])
  	}

  	private loadPools():void{
  		this.poolProvider.getAll().then( (pools:any) => {
  			console.log(pools)
  			if(pools.length > 0){
  				pools.map( pool => {
  					pool.completed_tasks = pool.tasks.filter( e => e.status == 3).length
  					pool.tasks = pool.tasks.length
  					pool.watchers = pool.watchers.length
  				} )
  				this.pools = pools;
  				this.top_pools = this.pools.slice(0,4)
  			}

  		})
  	}

}
