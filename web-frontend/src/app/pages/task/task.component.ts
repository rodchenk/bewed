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

  	constructor(private route: ActivatedRoute, private taskProvider: TaskService) { }

  	ngOnInit() {
  		this.route.params.subscribe( (params:any) => this._loadTaskData(params['task']) )
  	}

  	private _loadTaskData(id:string):void{
		this.taskProvider.getTask(id).then( (data:any) => {
			console.log(data)
			this.task = data
  		}).catch( error => console.warn(error));
  	}

}
