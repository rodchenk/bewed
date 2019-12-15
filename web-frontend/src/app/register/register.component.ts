import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';
import { Router } from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    private registerForm: FormGroup
	public hide: boolean = true
    private readonly message_required_fields = 'All fields are required'

    constructor(private router: Router, private formBuilder: FormBuilder, private userProvider: UserService, private dialog: MatDialog) {
      if(this.userProvider.isLoggedIn)
          this.router.navigate(['/'])
    }

  	onSubmit(values:any){
        if(!values.email || !values.name || !values.password){
            this.userProvider.showError(this.message_required_fields);
            return;
        }
		this.userProvider.register(values);
  	}

  	ngOnInit() {
  		this.registerForm = new FormGroup({
            name: new FormControl(),
            password: new FormControl(),
            email: new FormControl()
        });
  	}

    openLogin(){
      this.dialog.open(LoginComponent)
    }
}
