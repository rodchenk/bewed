import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PoolCategoryAbstract, PoolCategory} from './../pool-category';
import { PoolService } from './../pool.service';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-pool-settings',
    templateUrl: './pool-settings.component.html',
    styleUrls: ['./pool-settings.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class PoolSettingsComponent implements OnInit {

	private pool:any = {}
	private form:FormGroup
	public categories: PoolCategoryAbstract[] = PoolCategory.categories

	constructor(@Inject(MAT_DIALOG_DATA) public pool_data: any, private dialogRef: MatDialogRef<PoolSettingsComponent>, private dialog: MatDialog, private poolProvider: PoolService, private router: Router, private userProvider: UserService) {
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
  		this.pool.name = pool.name
  		this.pool.category = pool.category
  		this.pool.private = pool.private
  		this.pool.tags = pool.tags
  		this.pool.description = pool.description

  		this.poolProvider.update(this.pool).then( _ => this.close(true)).catch( error => console.warn(error))
  	}

  	private close(isUpdated:boolean = false):void {
  		this.dialogRef.close(isUpdated)
  	}

    /**
    * @TODO add confiramtion dialog
    */
    deletePool():void{
        let dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: 'Aree you sure you want to delete ' + this.pool.name + '?',
                okButton: 'Delete'
            }
        });
        dialog.afterClosed().subscribe( (isConfirmed:boolean) => {
            if(isConfirmed)
                this.poolProvider.delete(this.pool).then( _ => {
                    this.close()
                    this.router.navigate(['/studio/' + this.userProvider.user.user_id])
                }).catch( error => console.warn(error))
        })
    }

}
