import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule, MatSelectModule, 
        MatInputModule, MatFormFieldModule, MatMenuModule, 
        MatToolbarModule, MatIconModule, MatCardModule, 
        MatProgressSpinnerModule, MatDialogModule, MatChipsModule,
        MatTabsModule, MatDatepickerModule, MatNativeDateModule,
        MatProgressBarModule } from '@angular/material';
import { ProjectComponent } from './project/project.component';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { StudioComponent } from './studio/studio.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PoolModalComponent } from './pool-modal/pool-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CompleteSignupComponent } from './complete-signup/complete-signup.component';
import { StudioPoolComponent } from './studio-pool/studio-pool.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MessageComponent,
    HomeComponent,
    ProjectComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    StudioComponent,
    SidenavComponent,
    PoolModalComponent,
    SettingsComponent,
    ChangePasswordComponent,
    NotFoundComponent,
    CompleteSignupComponent,
    StudioPoolComponent
  ],
  imports: [
    ToastrModule.forRoot(), // ToastrModule added
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDatepickerModule,
    AngularFirestoreModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'bewed')
  ],
  entryComponents: [
      PoolModalComponent,
      ChangePasswordComponent,
      LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
