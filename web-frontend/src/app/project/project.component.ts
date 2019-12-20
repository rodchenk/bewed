import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('250ms ease-in', style({opacity: '1'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class ProjectComponent implements OnInit {

	public projects:[any]
	private connected:boolean = true
	private host:string = 'http://localhost:3000/api'
  
  	constructor(private http:HttpClient) { }

  	ngOnInit() {
  		console.log('Explore init');
  		this.http.get(this.host + '/projects').subscribe((data:any) => {
  			console.log(data);
  			this.projects = data.docs;
  			for(let project of this.projects){
  				let params = new HttpParams().set("_id", project.author); 
	  			this.http.get(this.host + '/user', {params}).subscribe((data:any) => {
	  				project.authname = data.docs[0].name;
	  				project.liked = false
	  			}, err => {
	  				console.log(err)
	  			});
	  		}
  		}, err => {
  			this.connected = false
  		});

  	}

  	public like(project:any){
  		project.liked = !project.liked
  	}
}
