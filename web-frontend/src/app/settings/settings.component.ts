import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { ChangePasswordComponent } from './../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotoComponent } from './../upload-photo/upload-photo.component';

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
    private readonly message_data_saved = 'Data has been saved'

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
    public logoutOtherDisabled: boolean = true

	public progress:number

	private progressTable:any = {
		firstName: 0,
		lastName: 0,
		birthday: 0,
		photo: 0,
		location: 0,
		gender: 0,
        status: 0,
        name: 0
	}

  	constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private userProvider: UserService) {
  		this.userProvider.getUserData().then( (data:any) => {

  			if(data.docs.length > 0){
  			  	this.user = data.docs[0]
  			  	this.settingsForm.patchValue(this.user)
  			  	this.securityForm.patchValue(this.user)
  			  	this.saveDisabled = true
            this.saveSecurityDisabled = true

  			  	this.logoutOtherDisabled = !(Object.keys(this.user.session).length > 1)
  			}	
  			console.log(this.user)
  		})

  	}

    uploadImage():void{
        let imageDialog = this.dialog.open(UploadPhotoComponent)
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
  	* @init value of the progress bar is 4
  	*/
  	calcGeneralProgress(){
  		if(this.settingsForm.controls.firstName.value) 	this.progressTable.firstName = 12; else this.progressTable.firstName = 0
  		if(this.settingsForm.controls.lastName.value) 	this.progressTable.lastName	 = 12; else this.progressTable.lastName	 = 0
  		if(this.settingsForm.controls.location.value) 	this.progressTable.location  = 12; else this.progressTable.location  = 0
  		if(this.settingsForm.controls.gender.value) 	  this.progressTable.gender 	 = 12; else this.progressTable.gender 	 = 0
  		if(this.settingsForm.controls.photo.value) 		  this.progressTable.photo 	 =   12; else this.progressTable.photo 	   = 0
  		if(this.settingsForm.controls.birthday.value) 	this.progressTable.birthday  = 12; else this.progressTable.birthday  = 0
      if(this.settingsForm.controls.name.value)       this.progressTable.name    =   12; else this.progressTable.name      = 0
      if(this.settingsForm.controls.status.value)     this.progressTable.status  =   12; else this.progressTable.status    = 0

  		this.progress = 4 + this.progressTable.name + this.progressTable.status + this.progressTable.firstName + this.progressTable.lastName + 
                      this.progressTable.birthday + this.progressTable.photo + this.progressTable.location + this.progressTable.gender		
  	}

  	/**
  	* @method initializes a securityForm and set onChange event
  	*/
  	initSecurityForm(){
  		this.securityForm = new FormGroup({
  			email: new FormControl('', [Validators.email, Validators.required]),
  			password: new FormControl('', [Validators.minLength(5), Validators.required]),
  			tel: new FormControl(),
  			sec_email: new FormControl('', [Validators.email])
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
			firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
			lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
			birthday: new FormControl(),
			photo: new FormControl(),
			location: new FormControl(),
			gender: new FormControl(),
      name: new FormControl('', [Validators.required]),
      status: new FormControl('', Validators.maxLength(256))
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
      if(this.securityForm.status === 'INVALID') return;

  		this.user.email = values.email
  		this.user.sec_email = values.sec_email
  		this.user.tel = values.tel

  		this.save()
  	}

  	/**
  	* @method patches general form values to user object and calls save function
  	*/
  	saveGeneral(data:any){
      if(this.settingsForm.status === "INVALID") return;

  		this.user.firstName = data.firstName
  		this.user.lastName = data.lastName
  		this.user.birthday = data.birthday
  		this.user.location = data.location
  		this.user.photo = data.photo
  		this.user.gender = data.gender
      this.user.status = data.status
      this.user.name = data.name

      this.saveDisabled = true
  		this.save()
  	}

  	/**
  	* @method saves user data via userProvider
  	*/
  	private save(){
  		this.userProvider.saveUserData(this.user).then((data:any) => {
  			this.user._rev = data.data.rev
  			this.userProvider.showSuccess(this.message_data_saved)
  			this.saveDisabled = true
        this.saveSecurityDisabled = true
  		}, error => console.warn(error) )
  	}

  	/**
  	* @method open pop up with change password form
  	*/
  	onChangePassword(){
  		this.dialog.open(ChangePasswordComponent)
  	}

    logoutOther():void {
        this.userProvider.logoutOther().then( _ => this.logoutOtherDisabled = true )
    }

}
