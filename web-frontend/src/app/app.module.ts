/* Angular components */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* 3rd Party Components */
import { ImageCropperModule } from 'ngx-image-cropper';

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

/* bewed components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './pages/user/user.component';
import { MessageComponent } from './pages/message/message.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './pages/footer/footer.component';
import { StudioComponent } from './pages/studio/studio.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { PoolModalComponent } from './pages/pool-modal/pool-modal.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CompleteSignupComponent } from './pages/complete-signup/complete-signup.component';
import { StudioPoolComponent } from './pages/studio-pool/studio-pool.component';
import { PoolSettingsComponent } from './pages/pool-settings/pool-settings.component';
import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';
import { ExploreUsersComponent } from './pages/explore-users/explore-users.component';
import { UploadPhotoComponent } from './pages/upload-photo/upload-photo.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { TaskComponent } from './pages/task/task.component';

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        MessageComponent,
        HomeComponent,
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
        ExploreUsersComponent,
        UploadPhotoComponent,
        CreateTaskComponent,
        TaskComponent
    ],
    imports: [
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
        ImageCropperModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, 'bewed')
    ],
    entryComponents: [
        PoolModalComponent,
        ChangePasswordComponent,
        LoginComponent,
        PoolSettingsComponent,
        ConfirmDialogComponent,
        UploadPhotoComponent,
        CreateTaskComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
