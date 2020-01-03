import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

	private users:any[] = []

  	constructor(@Inject(MAT_DIALOG_DATA) private data:any, private dialogRef: MatDialogRef<UsersListComponent>, private router: Router) {
  		
  		if(this.data.docs && this.data.docs.length > 0){
  			this.users = this.data.docs
  		}
  	}

  	private navigateToUser(user:string):void{
  		this.dialogRef.close();
  		this.router.navigate(['/user/' + user])
  	}

  	ngOnInit() {
  	}

}
