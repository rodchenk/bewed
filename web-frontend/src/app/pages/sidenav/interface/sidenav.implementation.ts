import { SideNav } from './sidenav.interface';
import { StudioComponent } from './../../studio/studio.component';

/**
* @author Mischa Rodchenkov
* @github github.com/rodchenk
*/
export class StudioNav implements SideNav{

	constructor(private component: any){}
	
	addNew():void{
		this.component.addPool()
	}

}

export class PoolNav implements SideNav{
	
	constructor(private component: any){ }
	
	addNew():void{
		this.component.newTask()
	}
}

export class ProjectNav implements SideNav{
	
	constructor(private component: any){ }
	
	addNew():void{
		console.log('new task?')
	}
}