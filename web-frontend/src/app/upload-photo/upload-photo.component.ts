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

	constructor(@Inject(MAT_DIALOG_DATA) public image: any, private dialog: MatDialogRef<UploadPhotoComponent>, private bar: MatSnackBar) {
		this.croppedImage = image ? image : ''
	}

	ngOnInit() { }

	fileChangeEvent(event:ImageCroppedEvent):void{
		console.log('fileChangeEvent')
		this.imageChangedEvent = event;
	}

	loadImageFailed():void{
		console.log('loadImageFailed')
		this.bar.open('Loading failed', 'Close', {
			verticalPosition: 'top',
			duration: 3000
		})
	}

	cropperReady():void{
		console.log('cropperReady')
		this.bar.open('Image loaded', 'Close', {
			verticalPosition: 'top',
			duration: 3000
		})
	}

	imageLoaded():void{
		console.log('imageLoaded')
	}

	imageCropped(event:ImageCroppedEvent):void{
		console.log('imageCropped')
		this.croppedImage = event.base64;
	}

	close(result:any = null):void{
		this.dialog.close(result)
	}

	save():void{
		this.close(this.croppedImage)
	}

}
