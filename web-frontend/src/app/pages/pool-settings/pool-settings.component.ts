import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PoolCategoryAbstract, PoolCategory} from './../../interfaces/pool-category';
import { PoolService } from './../../services/pool.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
    selector: 'app-pool-settings',
    templateUrl: './pool-settings.component.html',
    styleUrls: ['./pool-settings.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
* @TODO tagsInput
*/
export class PoolSettingsComponent implements OnInit {

	private pool:any = {}
	private form:FormGroup
	public categories: PoolCategoryAbstract[] = PoolCategory.categories
    readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE]
    public tags: any[] = []

	constructor(@Inject(MAT_DIALOG_DATA) public pool_data: any, private dialogRef: MatDialogRef<PoolSettingsComponent>, private dialog: MatDialog, private poolProvider: PoolService, private router: Router, private userProvider: UserService) {
  		this.pool = pool_data
  	}

    addTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if((value || '').trim())
            this.tags.push(value.trim())

        if(input) 
            input.value = '';
    }

    removeTag(tag: string): void {
        const index = this.tags.indexOf(tag);

        if(index >= 0) 
            this.tags.splice(index, 1);
    }

  	ngOnInit() {
  		if(!this.pool.tags)
  			this.pool.tags = []
        this.tags = [...this.pool.tags]

  		this.form = new FormGroup({
  			name: new FormControl('', [Validators.required, Validators.maxLength(56)]),
  			category: new FormControl('', Validators.required),
  			private: new FormControl(),
  			description: new FormControl('', Validators.maxLength(256)),
            sponsor: new FormControl()
  		})
  		this.form.patchValue(this.pool)
  	}

    /**
    * @method patch form values to pool object and send to pooProvider to update it in DB
    */
  	private onSubmit(pool:any):void{
  		this.pool.name = pool.name
  		this.pool.category = pool.category
  		this.pool.private = pool.private
  		this.pool.description = pool.description
        this.pool.sponsor = pool.sponsor
        this.pool.tags = this.tags

  		this.poolProvider.update(this.pool).then( _ => this.close(true)).catch( error => console.warn(error))
  	}

    /**
    * @method closes modal setting window
    */
  	private close(isUpdated:boolean = false):void {
  		this.dialogRef.close(isUpdated)
  	}

    /**
    * @method opens confirmDialog and after confirmation removes pool data from DB
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
