import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';

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
	categories: PoolCategory[] = [
    	{value: 'art', viewValue: 'Art'},
    	{value: 'eng', viewValue: 'Engineering'},
    	{value: 'sport', viewValue: 'Sport'}
  	];

  	constructor(private formBuilder: FormBuilder, private userProvider: UserService) { }

  	ngOnInit() {
  		this.poolForm = new FormGroup({
			name: new FormControl(),
			category: new FormControl(),
			isprivate: new FormControl()
		});
  	}

  	public onSubmit(values:any){
  		console.log(values)
  	}

  	public close(){

  	}
}
