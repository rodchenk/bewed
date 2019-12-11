import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {

  	constructor(private dialog: MatDialog) { }

  	ngOnInit() { }

  	public addPool(){
  		console.log('add pool')
  		const dialogRef = this.dialog.open(LoginComponent);
  	}

}
