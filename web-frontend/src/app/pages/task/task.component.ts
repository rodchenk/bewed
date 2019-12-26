import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './../../services/task.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

	private task:any = {}
	private component:TaskComponent = this

  	constructor(private route: ActivatedRoute, private taskProvider: TaskService, private dialog: MatDialog, private router: Router) { }

  	ngOnInit() {
  		this.route.params.subscribe( (params:any) => this._loadTaskData(params['task']) )
  	}

  	private _loadTaskData(id:string):void{
		this.taskProvider.getTask(id).then( (data:any) => this.task = data.docs[0] ).catch( error => console.warn(error));
  	}

  	private save():void{
  		console.log('works')
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
