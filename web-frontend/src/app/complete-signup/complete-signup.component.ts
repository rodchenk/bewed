import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-complete-signup',
  templateUrl: './complete-signup.component.html',
  styleUrls: ['./complete-signup.component.scss']
})
export class CompleteSignupComponent implements OnInit {

  	constructor(private snackBar: MatSnackBar, private userProvider: UserService, private router: Router) { }

    public email = ''

  	ngOnInit() {
      if(this.userProvider.isLoggedIn){
        this.router.navigate(['page-not-found'])
      }else{
  		  this.showBar()
        this.email = this.userProvider.getSavedEmail()
      }
  	}

  	public resend():void{
  		this.showBar()
  	}

  	private showBar():void{
  		this.snackBar.open('Verification code sent', 'Close', {
  			duration: 3000,
  			horizontalPosition: 'right',
  			verticalPosition: 'top'
		});
  	}
}