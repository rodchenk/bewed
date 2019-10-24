import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

	public messages: any;
	public loading:boolean = true;
	public messagetext:string = ''
	public name: string ='Anon'

  	constructor(private db: AngularFireDatabase) {}

	ngOnInit() {
		this.db.list('messages').snapshotChanges().subscribe(data => {
			this.messages = data.map(res => res.payload.val())
			this.loading = false;
			console.log('new message')
		});
  	}

  	ngAfterViewChecked(){
  		this.scrollToBottom()
  	}

  	get timestamp() {
    	return firebase.database.ServerValue.TIMESTAMP;
  	}

  	private scrollToBottom(){
  		let container = document.getElementsByClassName('content')[0]
  		container.scrollTo(0, container.scrollHeight)
  		console.log('scrolling')
  	}

  	send_message(){
  		if(this.messagetext.trim().length === 0) return;
  		let time = this.timestamp
  		console.log(time)
  		this.db.object('messages/' + (+new Date())).set({
  			name: this.name,
  			time: time,
  			text: this.messagetext
  		}).then(_ => {
  			this.messagetext = ''
  			this.scrollToBottom()
  		});
  	}

}
