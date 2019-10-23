import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [  
	{
  		path: '',    
  		component: HomeComponent
 	},
 	{
 		path: 'user',
 		component: UserComponent
 	},
 	{
 		path: 'msg',
 		component: MessageComponent
 	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
