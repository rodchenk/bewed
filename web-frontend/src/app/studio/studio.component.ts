import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PoolModalComponent } from './../pool-modal/pool-modal.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './../user.service';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class StudioComponent implements OnInit {

	private host_and_service: string = 'http://127.0.0.1:3000/api'
	public pools:any[] = [];

  	constructor(private dialog: MatDialog, private http: HttpClient, private userProvider: UserService) { }

  	ngOnInit() {
  		this.getUserPools()
  	}

  	/**
    * @unused
  	* @method gets all pool data from API
  	* @use_api GET /pool/all
  	*/
  	private getPools(){
  		this.http.get(this.host_and_service + '/pool/all', {}).subscribe( (data:any) => {
  			this.pools = data.docs;
  		}, error => console.warn(error))
  	}

  	/**
  	* @method gets all pool data of given user_id from API
  	* @use_api GET /pool
  	*/
  	private getUserPools(){
  		this.http.get(this.host_and_service + '/pool', {
  			params: { 
          user_id: this.userProvider.user.user_id
        }
  		}).subscribe( (data:any) => {
  			this.pools = data.docs;
  		}, error => console.warn(error))
  	}

  	/**
  	* @method opens modal dialog with pool creation form
  	*/
  	public addPool(){
  		const dialogRef = this.dialog.open(PoolModalComponent)
  		dialogRef.afterClosed().subscribe((hasAdd:boolean) => {
  			if(hasAdd) this.getUserPools()
  			
  		})
  	}

  	/**
  	* @method opens the pool on click
  	*/
  	public openPool(pool:any){
  		console.log(pool)
  	}
}