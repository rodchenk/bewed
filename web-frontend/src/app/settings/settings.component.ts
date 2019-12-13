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
	private user:any = null
	public progress:number = 0

  	constructor(private formBuilder: FormBuilder, private userProvider: UserService, private http: HttpClient) { }

  	ngOnInit() {
  		this.user = this.userProvider.user
  		this.settingsForm = new FormGroup({
			firstName: new FormControl(),
			lastName: new FormControl(),
			birthday: new FormControl(),
			photo: new FormControl(),
			location: new FormControl(),
			gender: new FormControl()
		});
  		this.calcProgress()
  	}

  	calcProgress(){
  // 		if(this.user.firstName) this.progress += 15
		// if(this.user.lastName) 	this.progress += 15
		// if(this.user.birthdat) 	this.progress += 15
		// if(this.user.gender) 	this.progress += 15
		// if(this.user.location) 	this.progress += 15
		// if(this.user.photo) 	this.progress += 25
		if(this.progress < 100)
			this.progress += 25
  	}

  	saveGeneral(values:any){
  		console.log(values)
  		this.calcProgress()
  	}

}
