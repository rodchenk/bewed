import { Injectable } from '@angular/core';
import { SideNav } from './sidenav.interface';
import { StudioComponent } from './../../studio/studio.component';

@Injectable({
  	providedIn: 'root'
})
export class StudioNav implements SideNav{

	constructor(){}
	
	addNew():void{
		console.log('new pool?')
		// emit?
	}

}

export class PoolNav implements SideNav{
	
	constructor(){ }
	
	addNew():void{
		console.log('new project?')
	}

}