import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { PoolService } from './../../services/pool.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
/**
* @author Misha Rodchenkov
* @github github.com/rodchenk
*/
export class NewsComponent implements OnInit {

	private news:any[] = []
	private loadNextVisible:boolean = false
	private me:string

  	constructor(private userProvider: UserService, private poolProvider: PoolService) { }

  	ngOnInit() {
  		this.me = this.userProvider.user.user_id
  		this._loadNews()
  	}

  	private _loadNews():void{
  		this.poolProvider.getUserNews( { user_id: this.userProvider.user.user_id, offset: 0} ).then( (data:any) => {
  			if(data.rows){
  				this.news = data.rows
  				this.loadNextVisible = true
  			}
  		})
  	}

  	private parseTaskStatus(status:number):string{
  		return status == 0 ? 'Waiting' : status == 1 ? 'To do' : status == 2 ? 'Active' : 'Completed'
  	}

  	private loadNext():void{
  		this.poolProvider.getUserNews( { user_id: this.userProvider.user.user_id, offset: this.news.length}).then( (data:any) => {
  			if(data.rows){
  				data.rows.forEach(row => this.news.push(row));
  			}else{
  				this.loadNextVisible = false
  			}
  		})
  	}

  	private goTop():void{
  		window.scrollTo({top: 0, behavior: "smooth"})
  	}
}
