import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PoolModalComponent } from './../pool-modal/pool-modal.component';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {

  	constructor(private dialog: MatDialog) { }

  	ngOnInit() { }

  	public addPool(){
  		const dialogRef = this.dialog.open(PoolModalComponent);
  	}
}