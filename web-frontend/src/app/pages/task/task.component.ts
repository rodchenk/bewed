import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { PoolService } from './../../services/pool.service';
import { UserService } from './../../services/user.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { Helper } from './../../helper';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

	private task:any = {comments:[], likes: []}
	private pool:any = {}
	private status:number = 0
	private comment:string = ''
	private author_image:string

  	constructor(private route: ActivatedRoute, private poolProvider: PoolService, private dialog: MatDialog, private router: Router, private userProvider: UserService) { }

  	ngOnInit() {
  		this.route.params.subscribe( (params:any) => this._loadTaskData(params['pool'], params['task']) )
  	}

  	private _loadTaskData(pool_id:string, task_id:string):void{

  		this.poolProvider.getByID(pool_id).then( (data:any) => {
  			this.pool = data
  			this.task = data.tasks.filter(task => task._id == task_id)[0]

  			this.userProvider.getUserImage(null, {user_id:this.task.user_id,size:'s'}).then( (data:any) => {
				if(data.docs.length > 0){
					this.author_image = data.docs[0].photo || '/assets/img/dpi.png'
				} 
			})
  		})
  	}

  	private commentTask():void{
  		if(!this.comment.trim())
  			return

  		let comment = {
  			_id: Helper.gen_random(),
  			content: this.comment,
  			author: this.userProvider.user.user_id,
  			created: new Date()
  		}

  		this.task.comments.push(comment)
  		this.save()
  	}

  	private removeComment(comment_id:string):void{
  		let index:number = this.task.comments.findIndex(e => e._id == comment_id)
  		if(index > -1){
  			this.task.comments.splice(index, 1)
  			this.pool = this.poolProvider.mergeTask(this.pool, this.task)
  			this.poolProvider.update(this.pool)
  		}
  	}

  	private goBack():void{
  		this.router.navigate(['studio/' + this.task.user_id + '/' + this.pool._id])
  	}

  	private save():void{
  		this.pool = this.poolProvider.mergeTask(this.pool, this.task)
  		this.poolProvider.update(this.pool).then( () => this.comment = '' ).catch( error => console.warn(error))
  	}

  	setStatus(status:number):void{
  		this.task.status = status
  		this.save()
  	}

  	/**
  	* @methof
  	*/
  	private delete():void{
  		let dialog = this.dialog.open(ConfirmDialogComponent, {data: {
  			message: 'Do you want to delete a task?',
  			okButton: 'Yes, delete task'
  		}})
  		dialog.afterClosed().subscribe( (confirmed: boolean) => {
  			if(confirmed){
  				this.poolProvider.cutTask(this.pool, this.task)
				this.poolProvider.update(this.pool).then( () => this.router.navigate(['studio/' + this.pool.user + '/' + this.pool._id]) ).catch( error => console.warn(error))
  			}
  		})
  	}

}
