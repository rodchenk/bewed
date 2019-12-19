import { Component, OnInit, Input } from '@angular/core';
import { StudioNav, PoolNav } from './interface/sidenav.implementation';
import { SideNav } from './interface/SideNav.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
	@Input()
	page: string

	protected sideNav: SideNav
	public sidenavEnabled:boolean = true

  	constructor() { }

  	ngOnInit() {
  		switch (this.page) {
  			case 'studio':	this.sideNav = new StudioNav(); break;
  			case 'pool':	this.sideNav = new PoolNav(); 	break;

  			default: 
  				console.warn('No implementation component found for ' + this.page); 
  				this.sidenavEnabled = false; 
  				break;
  		}
  	}

  	public newEntity():void{
  		this.sideNav.addNew()
  	}

}
