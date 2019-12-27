import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './../../services/task.service';
import { UserService } from './../../services/user.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

	private task:any = {}
	private status:number = 0
	private comment:string = ''
	private author_image:string

  	constructor(private route: ActivatedRoute, private taskProvider: TaskService, private dialog: MatDialog, private router: Router, private userProvider: UserService) { }

  	ngOnInit() {
  		this.route.params.subscribe( (params:any) => this._loadTaskData(params['task']) )
  	}

  	private _loadTaskData(id:string):void{
		this.taskProvider.getTask(id).then( (data:any) => {
			this.task = data.docs[0]
			if(!this.task.comments){
				this.task.comments = []
			}
			this.userProvider.getUserImage(null, {user_id:this.task.user_id,size:'s'}).then( (data:any) => {
				if(data.docs.length > 0){
					this.author_image = data.docs[0].photo || '/assets/img/dpi.png'
				} 
			})
		} ).catch( error => console.warn(error));
  	}

  	private commentTask():void{
  		let comment = {
  			content: this.comment,
  			author: this.userProvider.user.user_id,
  			created: new Date()
  		}
  		this.task.comments.push(comment)
  		this.taskProvider.updateTask(this.task).then( () => {
  			this.comment = ''
  			this._loadTaskData(this.task._id)
  		})
  	}

  	private goBack():void{
  		this.router.navigate(['studio/' + this.task.user_id + '/' + this.task.parent])
  	}

  	private save():void{
  		this.taskProvider.updateTask(this.task)
  	}

  	setStatus(status:number):void{
  		this.task.status = status
  		this.save()
  	}

  	private delete():void{
  		let dialog = this.dialog.open(ConfirmDialogComponent, {data: {
  			message: 'Do you want to delete a task?',
  			okButton: 'Yes, delete task'
  		}})
  		dialog.afterClosed().subscribe( (confirmed: boolean) => {
  			if(confirmed){
  				this.taskProvider.deleteTask(this.task).then( () => this.router.navigate(['studio/' + this.task.user_id + '/' + this.task.parent]))
  			}
  		})
  	}

}
