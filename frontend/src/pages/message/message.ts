import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
	segment: 'mg'
})
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

	public header_data:any = {
		ismenu: true,
		ishome: false,
		title: "Home"
	};

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

}
