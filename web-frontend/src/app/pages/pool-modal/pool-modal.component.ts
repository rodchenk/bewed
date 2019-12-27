import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PoolCategory, PoolCategoryAbstract } from './../../interfaces/pool-category';
import { Layout, LayoutAbstract } from './../../interfaces/layout';
import { PoolService } from './../../services/pool.service';

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
  	private auto_layout:boolean = true
	public categories: PoolCategoryAbstract[] = PoolCategory.categories
	public layouts: LayoutAbstract[] = Layout.layouts

  	constructor(private poolProvider: PoolService, private formBuilder: FormBuilder, public dialog: MatDialogRef<PoolModalComponent>) { }

  	ngOnInit() {
  		this.poolForm = new FormGroup({
			name: new FormControl(),
			category: new FormControl(),
			layout: new FormControl({value: ''})
		});
  	}

  	/**
  	* @method is called after form submition; add pool to DB via API
  	* @use_api POST /pool
  	*/
  	public onSubmit(values:any){
    	if(this.auto_layout){
    		switch (values.category) {
    			case PoolCategory.SPORT: values.layout = Layout.CHAIN;	break;
    			case PoolCategory.ART: 	 values.layout = Layout.GALLERY;break;
    			case PoolCategory.ENGINEERING: 
    			default:   				 values.layout = Layout.CANBAN; break;
    		}
      	}
  		this.poolProvider.add(values).then( (ok:boolean) => this.close(ok) ).catch( error => console.warn(error) )
  	}

  	/**
  	* @method closes the modal window (Add pool)
  	*/
  	public close(hasAdd:boolean = false){
  		this.dialog.close(hasAdd);
  	}
}
