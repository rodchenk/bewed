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

import { MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { ProjectComponent } from './project/project.component';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';
import { StudioComponent } from './studio/studio.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PoolModalComponent } from './pool-modal/pool-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MessageComponent,
    HomeComponent,
    ProjectComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    FooterComponent,
    StudioComponent,
    SidenavComponent,
    PoolModalComponent
  ],
  imports: [
    ToastrModule.forRoot(), // ToastrModule added
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    AngularFirestoreModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'bewed')
  ],
  entryComponents: [
      PoolModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
