import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DropdownComponent } from './components/UI/dropdown/dropdown.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ButtonComponent } from './components/UI/button/button.component';
import { FeedbackItemComponent } from './components/feedback-item/feedback-item.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { environment } from 'src/environment/environment';
import { CapitalizeFirstLetterPipe } from './pipe/capitalize-first-letter.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddFeedbackPageComponent } from './pages/add-feedback-page/add-feedback-page.component';
import { GoBackComponent } from './components/UI/go-back/go-back.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FeedbackDetailComponent } from './pages/feedback-detail/feedback-detail.component';
import { EditFeedbackPageComponent } from './pages/edit-feedback-page/edit-feedback-page.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { RepliedCommentItemComponent } from './components/replied-comment-item/replied-comment-item.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { EllipsisPipe } from './pipe/ellipsis.pipe';
import { RoadmapPageComponent } from './pages/roadmap-page/roadmap-page.component';
import { RoadmapItemComponent } from './components/roadmap-item/roadmap-item.component';
import { RoadmapListComponent } from './components/roadmap-list/roadmap-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    MainPageComponent,
    ButtonComponent,
    FeedbackItemComponent,
    FeedbackListComponent,
    CapitalizeFirstLetterPipe,
    SidebarComponent,
    AddFeedbackPageComponent,
    GoBackComponent,
    FeedbackDetailComponent,
    EditFeedbackPageComponent,
    CommentItemComponent,
    CommentListComponent,
    RepliedCommentItemComponent,
    AddCommentComponent,
    EllipsisPipe,
    RoadmapPageComponent,
    RoadmapItemComponent,
    RoadmapListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
