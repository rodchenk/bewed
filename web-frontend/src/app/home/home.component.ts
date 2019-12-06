import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	public cards:any;
  	constructor() { }

  	ngOnInit() {
  		this.cards = [
  			new News('foliage Studio','Mischa'),
  			new News('Developing new features', 'Ksusha')
  		];
  	}

}
interface NewsInterface{
	title:string;
	author:string;
}
class News implements NewsInterface{
	
	title:string;
	author:string;

	constructor(title:string = '', author:string = ''){
		this.title = title;
		this.author = author;
	}
}