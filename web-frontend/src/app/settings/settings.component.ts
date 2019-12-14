import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';
import { ChangePasswordComponent } from './../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class SettingsComponent implements OnInit {

	private settingsForm:any
	private securityForm:any

	private user:any = {
		firstName: '',
		lastName: '',
		birthday: '',
		gender: '',
		location: '',
		photo: ''
	}

	public saveDisabled: boolean = true
	public saveSecurityDisabled: boolean = true

	public progress:number

	private progressTable:any = {
		firstName: 0,
		lastName: 0,
		birthday: 0,
		photo: 0,
		location: 0,
		gender: 0
	}

  	constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private userProvider: UserService) {
  		this.userProvider.getUserData().then( (data:any) => {

  			if(data.docs.length > 0){
  			  	this.user = data.docs[0]
  			  	this.settingsForm.patchValue(this.user)
  			  	this.securityForm.patchValue(this.user)
  			  	this.saveDisabled = true
  			  	this.saveSecurityDisabled = true
  			}	
  			console.log(this.user)
  		})

  	}

  	/**
  	* @method standard from Angular. Initialize forms
  	*/
  	ngOnInit() {
		this.initGeneralForm()
		this.initSecurityForm()
  	}

  	/**
  	* @method calculates a field progress of mat-progress-bar in general tab
  	* @init value of the progress bar is 10
  	*/
  	calcGeneralProgress(){
  		if(this.settingsForm.controls.firstName.value) 	this.progressTable.firstName = 15; else this.progressTable.firstName = 0
		if(this.settingsForm.controls.lastName.value) 	this.progressTable.lastName	 = 15; else this.progressTable.lastName	 = 0
		if(this.settingsForm.controls.location.value) 	this.progressTable.location  = 15; else this.progressTable.location  = 0
		if(this.settingsForm.controls.gender.value) 	this.progressTable.gender 	 = 15; else this.progressTable.gender 	 = 0
		if(this.settingsForm.controls.photo.value) 		this.progressTable.photo 	 = 15; else this.progressTable.photo 	 = 0
		if(this.settingsForm.controls.birthday.value) 	this.progressTable.birthday  = 15; else this.progressTable.birthday  = 0

  		this.progress = 10 + this.progressTable.firstName + this.progressTable.lastName + this.progressTable.birthday + this.progressTable.photo + this.progressTable.location + this.progressTable.gender		
  	}

  	/**
  	* @method initializes a securityForm and set onChange event
  	*/
  	initSecurityForm(){
  		this.securityForm = new FormGroup({
  			email: new FormControl(),
  			password: new FormControl(),
  			tel: new FormControl,
  			sec_email: new FormControl()
  		})
  		this.securityForm.valueChanges.subscribe( _ => {
  			this.saveSecurityDisabled = false
  		})
  	}

  	/**
  	* @method initializes a generalForm and set onChange event
  	*/
  	initGeneralForm(){
  		this.settingsForm = new FormGroup({
			firstName: new FormControl(),
			lastName: new FormControl(),
			birthday: new FormControl(),
			photo: new FormControl(),
			location: new FormControl(),
			gender: new FormControl()
		});
		this.settingsForm.valueChanges.subscribe( _ => {
			this.calcGeneralProgress()
			this.saveDisabled = false
		})
  	}

  	/**
  	* @method patches security form values to user object and calls save function
  	*/
  	saveSecurity(values:any){
  		this.user.email = values.email
  		this.user.sec_email = values.sec_email
  		this.user.tel = values.tel

  		this.save()
  	}

  	/**
  	* @method patches general form values to user object and calls save function
  	*/
  	saveGeneral(data:any){
  		this.user.firstName = data.firstName
  		this.user.lastName = data.lastName
  		this.user.birthday = data.birthday
  		this.user.location = data.location
  		this.user.photo = data.photo
  		this.user.gender = data.gender

  		this.save()
  	}

  	/**
  	* @method saves user data via userProvider
  	*/
  	private save(){
  		this.userProvider.saveUserData(this.user).then((data:any) => {
  			this.user._rev = data.data.rev
  			this.userProvider.showSuccess('Data has been saved')
  			this.saveDisabled = true
  		}, error => console.warn(error) )
  	}

  	/**
  	* @method open pop up with change password form
  	* @TODO
  	*/
  	onChangePassword(){
  		this.dialog.open(ChangePasswordComponent)
  	
  	}

}
