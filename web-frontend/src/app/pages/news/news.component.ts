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

  	constructor(private userProvider: UserService, private poolProvider: PoolService) { }

  	ngOnInit() {
  		this._loadNews()
  	}

  	private _loadNews():void{
  		this.poolProvider.getUserNews( this.userProvider.user.user_id ).then( (data:any) => {
  			console.log(data)
  			this.news = data.rows
  		})
  	}

}
