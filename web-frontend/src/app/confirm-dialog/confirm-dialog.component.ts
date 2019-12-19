import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

	public data:any = {}
 	
 	constructor(@Inject(MAT_DIALOG_DATA) public confirm_data: any, private dialog: MatDialogRef<ConfirmDialogComponent>) { 
 		this.data = confirm_data
 	}

  	close(result:boolean = false):void{
  		this.dialog.close(result)
  	}

}
