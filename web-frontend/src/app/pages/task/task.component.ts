import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

	private task:any = {}
	private component:TaskComponent = this

  	constructor(private route: ActivatedRoute, private taskProvider: TaskService) { }

  	ngOnInit() {
  		this.route.params.subscribe( (params:any) => this._loadTaskData(params['task']) )
  	}

  	private _loadTaskData(id:string):void{
		this.taskProvider.getTask(id).then( (data:any) => this.task = data.docs[0] ).catch( error => console.warn(error));
  	}

  	private save():void{
  		console.log('works')
  	}

}
