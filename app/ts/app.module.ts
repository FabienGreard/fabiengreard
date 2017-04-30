import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* ROUTING */
import { routing } from './app.routing';

/* MODULES */
import { DashboardModule } from './modules/dashboard/index';
import { ConsoleLogModule } from './modules/console-log/index';

/* COMPONENTS */
import { AppComponent } from './app.component';

/* SERVICES */

/* DIRECTIVES */
@NgModule({
  imports: [
    BrowserModule,
    routing,
    DashboardModule,
    ConsoleLogModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
