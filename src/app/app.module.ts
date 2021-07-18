import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { faHeart as farHeart, faComment as farComment} from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart, faComment as fasComment } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'status/:id',
    component: TweetComponent,
  },
  {
    path: '',
    redirectTo: 'status/1416839537821618184',
    pathMatch: 'full'
  }
  
];

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(fasHeart, farHeart);
    library.addIcons(fasComment, farComment);
  }
}
