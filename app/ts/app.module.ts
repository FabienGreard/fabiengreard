import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { DashboardComponent } from './components/dashboard/index';
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
import { AdminComponent } from './components/admin/index';

import { UserService, PostService } from './services/index';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  providers:[
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    if (process.env.ENV === 'production') {
      console.log("production mode enable");
    }else{
      console.log("developement mode enable");
    }
  }
}
