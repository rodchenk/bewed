import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

export interface PoolCategory {
	value: string;
  	viewValue: string;
}

@Component({
  selector: 'app-pool-modal',
  templateUrl: './pool-modal.component.html',
  styleUrls: ['./pool-modal.component.scss']
})
export class PoolModalComponent implements OnInit {

	private poolForm:any
	private host_and_service:string = 'http://127.0.0.1:3000/api'
	private service:string = '/api'

	public categories: PoolCategory[] = [
    	{value: 'art', viewValue: 'Art'},
    	{value: 'eng', viewValue: 'Engineering'},
    	{value: 'sport', viewValue: 'Sport'}
  	];

  	constructor(private formBuilder: FormBuilder, private userProvider: UserService, private http: HttpClient, public dialog: MatDialogRef<PoolModalComponent>) { }

  	ngOnInit() {
  		this.poolForm = new FormGroup({
			name: new FormControl(),
			category: new FormControl(),
			isprivate: new FormControl()
		});
  	}

  	public onSubmit(values:any){
  		if(!values.name || !values.category) 
  			return;
  		if(values.isprivate === null) 
  			values.isprivate = false;
  		this.http.post(this.host_and_service + '/pool', {
  			data: values,
  			user: this.userProvider.user.user_id
  		}).subscribe(
			data => this.close(true), 
			error => console.warn(error)
		)
  	}

  	public close(hasAdd:boolean = false){
  		this.dialog.close(hasAdd);
  	}
}
