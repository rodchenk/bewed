import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { PoolService } from './../../services/pool.service';
import { UserService } from './../../services/user.service';
import { Helper } from './../../helper';
import { ConfirmDialogComponent } from './../../pages/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-gallery-unit',
	templateUrl: './gallery-unit.component.html',
	styleUrls: ['./gallery-unit.component.scss']
})
export class GalleryUnitComponent implements OnInit {

	private pool:any = {}
	private unit:any = {comments: [], likes: []}
	private unit_id:string
	private type:string
	private comment:string
	private me:string
	private liked:boolean

  	constructor(@Inject(MAT_DIALOG_DATA) private data:any, private userProvider: UserService, private poolProvider: PoolService, private dialog: MatDialog, private dialogRef: MatDialogRef<GalleryUnitComponent>) { }

  	ngOnInit() {
  		this.pool = this.data.pool
  		this.unit_id = this.data.unit
  		this.type = this.data.type
  		this.unit = this.pool.tasks.filter(unit => unit._id == this.unit_id)[0]
  		this.me = this.userProvider.user.user_id
  		this.liked = this.unit.likes.indexOf(this.me) > -1
  	}

  	sendComment():void{
  		if(this.comment.trim()){
  			let comment = {
  				_id: Helper.gen_random(),
  				author: this.me,
  				created: new Date(),
  				content: this.comment
  			}

  			this.unit.comments.push(comment)
  			this.pool = this.poolProvider.mergeTask(this.pool, this.unit)

  			this.poolProvider.update(this.pool).then( () => this.comment = '').catch(error => console.warn(error) )
  		}
  	}

  	like():void{
  		if(this.liked){
  			this.unit.likes = this.unit.likes.filter(user => user != this.me)
  		}else{
  			this.unit.likes.push(this.me)
  		}

  		this.pool = this.poolProvider.mergeTask(this.pool, this.unit)
  		this.poolProvider.update(this.pool).then( () => this.liked = !this.liked).catch(error => console.warn(error) )
  	}

  	delete():void{
  		let dialog = this.dialog.open(ConfirmDialogComponent, {data: {message: 'Do you want to delete a picture?', okButton: 'Yes, delete'}})
  		dialog.afterClosed().subscribe((confirmed:boolean) => {
  			if(confirmed){
  				this.pool = this.poolProvider.cutTask(this.pool, this.unit)
  				this.poolProvider.update(this.pool).then( () => this.dialogRef.close() ).catch( error => console.warn(error) )
  			}
  		})
  	}

}
