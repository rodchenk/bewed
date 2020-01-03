import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

	private users:any[] = []

  	constructor(@Inject(MAT_DIALOG_DATA) private data:any, private dialogRef: MatDialogRef<UsersListComponent>) {
  		console.log(this.data)
  		if(this.data.docs && this.data.docs.length > 0){
  			this.users = this.data.docs
  		}
  	}

  	ngOnInit() {
  	}

}
