import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PoolCategoryAbstract, PoolCategory} from './../pool-category';
import { Config } from './../config';
import { PoolService } from './../pool.service';

@Component({
  selector: 'app-pool-settings',
  templateUrl: './pool-settings.component.html',
  styleUrls: ['./pool-settings.component.scss']
})
export class PoolSettingsComponent implements OnInit {

	private pool:any = {}
	private form:FormGroup
	public categories: PoolCategoryAbstract[] = PoolCategory.categories

	constructor(@Inject(MAT_DIALOG_DATA) public pool_data: any, private dialogRef: MatDialogRef<PoolSettingsComponent>, private poolProvider: PoolService) {
  		console.log(pool_data)
  		this.pool = pool_data
  	}

  	ngOnInit() {
  		this.form = new FormGroup({
  			name: new FormControl(),
  			category: new FormControl(),
  			private: new FormControl(),
  			tags: new FormControl(),
  			description: new FormControl()
  		})
  		this.form.patchValue(this.pool)
  	}

  	private onSubmit(pool:any):void{
  		console.log(pool)
  		this.pool.name = pool.name
  		this.pool.category = pool.category
  		this.pool.private = pool.private
  		this.pool.tags = pool.tags
  		this.pool.description = pool.description

  		this.poolProvider.update(this.pool).then( _ => this.close(true))
  	}

  	private close(isUpdated:boolean = false):void {
  		this.dialogRef.close(isUpdated)
  	}

}
