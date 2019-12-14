import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';

@Component({
  	selector: 'app-change-password',
  	templateUrl: './change-password.component.html',
  	styleUrls: ['./change-password.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class ChangePasswordComponent implements OnInit {

	public form:FormGroup
	public saveDisabled:boolean = true
	public hideOld:boolean = true
	public hideNew:boolean = true

  	constructor(private formBuilder: FormBuilder, private userProvider: UserService, private dialog: MatDialogRef<ChangePasswordComponent>) { }

  	ngOnInit() {
  		this.form = new FormGroup({
  			old_password: new FormControl(),
  			new_password: new FormControl()
  		})

  		this.form.valueChanges.subscribe( (data:any) => {
  			this.saveDisabled = !(data.old_password && data.new_password)
  		})
  	}

  	close():void{
  		this.dialog.close()
  	}

  	onChangePassword(values:any):void{
  		this.userProvider.changeUserPassword(values).then( (data:any) => {
  			if(data.success)
  				this.close()
  		})
  	}

}
