import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { MessageComponent } from './pages/message/message.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudioComponent } from './pages/studio/studio.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CompleteSignupComponent } from './pages/complete-signup/complete-signup.component';
import { StudioPoolComponent } from './pages/studio-pool/studio-pool.component';
import { ExploreUsersComponent } from './pages/explore-users/explore-users.component';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [  
	{
  		path: '',    
  		component: HomeComponent
 	},
 	{
 		path: 'user/:id',
 		component: UserComponent
 	},
 	{
 		path: 'studio/:user',
 		component: StudioComponent
 	},
 	{
 		path: 'msg',
 		component: MessageComponent
 	},
 	{
 		path: 'explore',
 		component: ExploreUsersComponent
 	},
 	{
 		path: 'settings',
 		component: SettingsComponent
 	},
 	{
 		path: 'signup',
 		component: RegisterComponent
 	},
 	{
 		path: 'complete-signup',
 		component: CompleteSignupComponent
 	},
 	{
 		path: 'studio/:user/:pool',
 		component: StudioPoolComponent
 	},
 	{
 		path: 'studio/:pool/task/:task',
 		component: TaskComponent
 	},
 	{ 
 		path: '**', 
 		component: NotFoundComponent  // error 404
 	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
