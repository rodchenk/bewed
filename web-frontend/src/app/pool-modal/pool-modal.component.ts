import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PoolCategory, PoolCategoryAbstract } from './../pool-category';
import { PoolService } from './../pool.service';

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

  	constructor(private poolProvider: PoolService, private formBuilder: FormBuilder, public dialog: MatDialogRef<PoolModalComponent>) { }

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
  		this.poolProvider.add(values).then( (ok:boolean) => this.close(ok) ).catch( error => console.warn(error) )
  	}

  	/**
  	* @method closes the modal window (Add pool)
  	*/
  	public close(hasAdd:boolean = false){
  		this.dialog.close(hasAdd);
  	}
}
