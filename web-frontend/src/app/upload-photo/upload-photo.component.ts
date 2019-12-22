import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {

	imageChangedEvent: any = '';
	public croppedImage:string = ''
	public user_photo:string = '/assets/img/dpi.png'
	public loading:boolean = false

	constructor(@Inject(MAT_DIALOG_DATA) public image: any, private dialog: MatDialogRef<UploadPhotoComponent>, private bar: MatSnackBar) {
		this.user_photo = this.image.image
	}

	ngOnInit() { }

	fileChangeEvent(event:ImageCroppedEvent):void{
		this.loading = true
		this.imageChangedEvent = event;
	}

	loadImageFailed():void{
		this.loading = false
		this.bar.open('Loading failed', 'Close', {
			verticalPosition: 'top',
			duration: 3000
		})
	}

	cropperReady():void{
		this.bar.open('Image loaded', 'Close', {
			verticalPosition: 'top',
			duration: 3000
		})
	}

	imageLoaded():void{
		this.loading = false
	}

	imageCropped(event:ImageCroppedEvent):void{
		this.croppedImage = event.base64;
	}

	close(result:any = null):void{
		this.dialog.close(result)
	}

	save():void{
		this.close(this.croppedImage)
	}

}
