import { Component, OnInit, Input } from '@angular/core';
import { StudioNav, PoolNav, ProjectNav } from './interface/sidenav.implementation';
import { SideNav } from './interface/SideNav.interface';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class SidenavComponent implements OnInit {

	@Input() page: string
	@Input() component: any

	protected sideNav: SideNav
	public sidenavEnabled:boolean = true

  	constructor() { }

  	ngOnInit() {
  		switch (this.page) {
  			case 'studio':	this.sideNav = new StudioNav(this.component); break;
  			case 'pool':	this.sideNav = new PoolNav(this.component); 	break;
  			case 'project':	this.sideNav = new ProjectNav(this.component);break;

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
