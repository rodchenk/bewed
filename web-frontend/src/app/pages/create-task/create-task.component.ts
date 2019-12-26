import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from './../../services/task.service';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-create-task',
  	templateUrl: './create-task.component.html',
  	styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

	private pool_id: string
	private form: FormGroup

  	constructor(@Inject(MAT_DIALOG_DATA) public parent: any, private dialogRef: MatDialogRef<CreateTaskComponent>, private taskProvider: TaskService, private userProvider: UserService) {
  		this.pool_id = parent
  	}

  	ngOnInit() {
  		this.form = new FormGroup({
  			name: new FormControl('', Validators.maxLength(56)),
  			description: new FormControl('', Validators.maxLength(256))
  		})
  	}

  	private save(values:any){
  		values.created = new Date()
  		values.user_id = this.userProvider.user.user_id
  		values.parent = this.pool_id
  		values.type = 'task'
      values.status = 0
  		this.taskProvider.saveTask(values).then( () => this.close(true)).catch( error => console.warn(error))
  	}

  	private close(result:boolean = false){
  		this.dialogRef.close(result)
  	}

}
