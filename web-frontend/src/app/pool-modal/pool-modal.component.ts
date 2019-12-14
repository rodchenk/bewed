import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { PoolCategory, PoolCategoryAbstract } from './../pool-category';
import { Config } from './../config';

@Component({
  selector: 'app-pool-modal',
  templateUrl: './pool-modal.component.html',
  styleUrls: ['./pool-modal.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class PoolModalComponent implements OnInit {

	private poolForm:any

	public categories: PoolCategoryAbstract[] = PoolCategory.categories

  	constructor(private formBuilder: FormBuilder, private userProvider: UserService, private http: HttpClient, public dialog: MatDialogRef<PoolModalComponent>) { }

  	ngOnInit() {
  		this.poolForm = new FormGroup({
			name: new FormControl(),
			category: new FormControl(),
			isprivate: new FormControl()
		});
  	}

  	/**
  	* @method is called after form submition; add pool to DB via API
  	* @use_api POST /pool
  	*/
  	public onSubmit(values:any){
  		if(!values.name || !values.category) 
  			return;
  		if(values.isprivate === null) 
  			values.isprivate = false;
  		this.http.post(Config.API_URL + '/pool', {
  			data: values,
  			user: this.userProvider.user.user_id
  		}).subscribe(
			data => this.close(true), 
			error => console.warn(error)
		)
  	}

  	/**
  	* @method closes the modal window (Add pool)
  	*/
  	public close(hasAdd:boolean = false){
  		this.dialog.close(hasAdd);
  	}
}
