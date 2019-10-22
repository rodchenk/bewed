import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	constructor(public navCtrl: NavController, private userProvider: UserProvider) {
	  	this.userProvider.getUser().then((data:any) => {
	  		console.log(data.content);
	  	});
  	}
}
