import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from './../../services/task.service';
import { UserService } from './../../services/user.service';
import { PoolService  } from './../../services/pool.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-create-task',
  	templateUrl: './create-task.component.html',
  	styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

	private parent_pool: any
	private form: FormGroup
	private readonly c:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	/**
	 * @return random String constising of 16 chars from this.c
	**/
	private gen_random():string{
		return Array.from({length:16}, _ => this.c[Math.floor(Math.random()*62)]).join('');
	}

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

  		values._id = this.gen_random()
  		values.created = new Date()
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
