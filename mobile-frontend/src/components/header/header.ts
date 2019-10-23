import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

	@Input()
  	set header(header_data: any) {
    	this.header_data = header_data;
  	}
  	
  	get header() {
    	return this.header_data;
  	}
  	
   	header_data: any;
  	constructor(public navCtrl: NavController) {}
  
  	homeClick() {
    	this.navCtrl.setRoot(HomePage);
  	}

}
