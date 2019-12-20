/* Angular components */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Google firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

/* Material components */
import { MatButtonModule, MatCheckboxModule, MatSelectModule, 
        MatInputModule, MatFormFieldModule, MatMenuModule, 
        MatCardModule, MatDialogModule, MatChipsModule,
        MatTabsModule, MatDatepickerModule, MatNativeDateModule,
        MatProgressBarModule, MatSnackBarModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

/* bewed components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
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
import { PoolSettingsComponent } from './pool-settings/pool-settings.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ExploreUsersComponent } from './explore-users/explore-users.component';
import { NgxTagsInputModule } from 'ngx-tags-input';

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
        StudioPoolComponent,
        PoolSettingsComponent,
        ConfirmDialogComponent,
        ExploreUsersComponent
    ],
    imports: [
        ToastrModule.forRoot(),
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTabsModule,
        MatInputModule,
        MatSnackBarModule,
        MatChipsModule,
        MatSelectModule,
        MatProgressBarModule,
        MatNativeDateModule,
        MatCardModule,
        MatDatepickerModule,
        AngularFirestoreModule,
        MatFormFieldModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireDatabaseModule,
        NgxTagsInputModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, 'bewed')
    ],
    entryComponents: [
        PoolModalComponent,
        ChangePasswordComponent,
        LoginComponent,
        PoolSettingsComponent,
        ConfirmDialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
