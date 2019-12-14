import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './../user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	private settingsForm:any
	private host_and_service:string = 'http://127.0.0.1:3000/api'
	private user:any = {
		firstName: '',
		lastName: '',
		birthday: '',
		gender: '',
		location: '',
		photo: ''
	}

	public saveDisabled: boolean = true

	public progress:number

	private progressTable:any = {
		firstName: 0,
		lastName: 0,
		birthday: 0,
		photo: 0,
		location: 0,
		gender: 0
	}

  	constructor(private formBuilder: FormBuilder, private userProvider: UserService, private http: HttpClient) {
		this.http.get(this.host_and_service + '/user', {params: { user_id: this.userProvider.user.user_id }}).subscribe((user:any) => {
  			if(user.docs.length > 0){
  			  	this.user = user.docs[0]
  			  	this.settingsForm.patchValue(this.user)
  			  	this.saveDisabled = true
  			}	
  			console.log(this.user)
  		})
  	}

  	ngOnInit() {
		this.initGeneralForm()
  	}

  	calcGeneralProgress(){
  		if(this.settingsForm.controls.firstName.value) 	this.progressTable.firstName = 15; else this.progressTable.firstName = 0
		if(this.settingsForm.controls.lastName.value) 	this.progressTable.lastName	 = 15; else this.progressTable.lastName	 = 0
		if(this.settingsForm.controls.location.value) 	this.progressTable.location  = 15; else this.progressTable.location  = 0
		if(this.settingsForm.controls.gender.value) 	this.progressTable.gender 	 = 15; else this.progressTable.gender 	 = 0
		if(this.settingsForm.controls.photo.value) 		this.progressTable.photo 	 = 15; else this.progressTable.photo 	 = 0
		if(this.settingsForm.controls.birthday.value) 	this.progressTable.birthday  = 15; else this.progressTable.birthday  = 0

  		this.progress = 10 + this.progressTable.firstName + this.progressTable.lastName + this.progressTable.birthday + this.progressTable.photo + this.progressTable.location + this.progressTable.gender		
  	}

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

  	saveGeneral(data:any){

  		this.user.firstName = data.firstName
  		this.user.lastName = data.lastName
  		this.user.birthday = data.birthday
  		this.user.location = data.location
  		this.user.photo = data.photo
  		this.user.gender = data.gender

  		this.http.put(this.host_and_service + '/user', {values: this.user}).subscribe( (data:any) => {
  			this.user._rev = data.data.rev
  			this.userProvider.showSuccess('Data has been saved')
  			this.saveDisabled = true
  		}, error => console.warn(error) )
  	}

}
