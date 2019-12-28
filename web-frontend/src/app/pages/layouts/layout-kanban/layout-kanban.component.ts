import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { PoolService } from './../../../services/pool.service';
import { CreateTaskComponent } from './../../../pages/create-task/create-task.component';


@Component({
  selector: 'app-layout-kanban',
  templateUrl: './layout-kanban.component.html',
  styleUrls: ['./layout-kanban.component.scss']
})
export class LayoutKanbanComponent implements OnInit {

	@Input() private pool_id:string

	private pool:any = {tasks:[]}

	private waiting_tasks:any[] = []
	private active_tasks:any[] = []
	private todo_tasks:any[] = []
	private done_tasks:any[] = []

  	constructor(private router: Router, private poolProvider: PoolService, private dialog: MatDialog) { }

  	ngOnInit() {
  		this.loadPoolData()
  	}

  	private loadPoolData():void{
		this.poolProvider.getByID(this.pool_id).then((data:any) => {
  			this.pool = data

	  		this.waiting_tasks = this.pool.tasks.filter(task => task.status == 0)
			this.todo_tasks = this.pool.tasks.filter(task => task.status == 1)
			this.active_tasks = this.pool.tasks.filter(task => task.status == 2)
			this.done_tasks = this.pool.tasks.filter(task => task.status == 3)
  		})
  	}

  	private newTask():void{
  		let dialog = this.dialog.open(CreateTaskComponent, { data: this.pool } );
  		dialog.afterClosed().subscribe((hasAdded:boolean) => {
  			if(hasAdded){
  				this.loadPoolData()
  			}
  		})
  	}

  	private openTask(task_id:boolean):void{
  		this.router.navigate(['studio/' + this.pool._id + '/task/' + task_id])
  	}
}
