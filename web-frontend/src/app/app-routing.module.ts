import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { StudioComponent } from './studio/studio.component';
import { SettingsComponent } from './settings/settings.component';

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
 		path: 'studio',
 		component: StudioComponent
 	},
 	{
 		path: 'msg',
 		component: MessageComponent
 	},
 	{
 		path: 'explore',
 		component: ProjectComponent
 	},
 	{
 		path: 'settings',
 		component: SettingsComponent
 	},
 	{
 		path: 'login',
 		component: LoginComponent
 	},
 	{
 		path: 'logout',
 		component: LogoutComponent
 	},
 	{
 		path: 'signup',
 		component: RegisterComponent
 	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
