import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AddFeedbackPageComponent } from './pages/add-feedback-page/add-feedback-page.component';
import { FeedbackDetailComponent } from './pages/feedback-detail/feedback-detail.component';
import { EditFeedbackPageComponent } from './pages/edit-feedback-page/edit-feedback-page.component';
import { RoadmapPageComponent } from './pages/roadmap-page/roadmap-page.component';


const routes: Routes = [
  {path: '', component:MainPageComponent},
  {path:'add', component:AddFeedbackPageComponent},
  {path:'roadmap', component: RoadmapPageComponent},
  {path:':id', component: FeedbackDetailComponent},
  {path:'edit/:id', component: EditFeedbackPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
