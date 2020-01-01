import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from './../../services/task.service';
import { UserService } from './../../services/user.service';
import { PoolService  } from './../../services/pool.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Helper, UPDATE_TRIGGER } from './../../helper';

@Component({
	selector: 'app-create-task',
  	templateUrl: './create-task.component.html',
  	styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

	private parent_pool: any
	private form: FormGroup

  	constructor(@Inject(MAT_DIALOG_DATA) public parent: any, private dialogRef: MatDialogRef<CreateTaskComponent>, private poolProvider: PoolService, private userProvider: UserService) {
  		this.parent_pool = parent
  	}

  	ngOnInit() {
  		this.form = new FormGroup({
  			name: new FormControl('', Validators.maxLength(56)),
  			description: new FormControl('', Validators.maxLength(256))
  		})
  	}

  	private save(values:any){

  		values._id = Helper.gen_random()
  		values.created = new Date()
      	values.updated = new Date()
      	values.update_trigger = UPDATE_TRIGGER.CREATED
  		values.user_id = this.userProvider.user.user_id
  		//values.parent = this.pool_id
  		values.type = 'task'
      	values.status = 0
      	values.comments = []

      	this.parent_pool.tasks.push(values)
      	this.poolProvider.update(this.parent_pool).then( () => this.close(true)).catch( error => console.warn(error))

  		//this.taskProvider.saveTask(values).then( () => this.close(true)).catch( error => console.warn(error))
  	}

  	private close(result:boolean = false){
  		this.dialogRef.close(result)
  	}

}
