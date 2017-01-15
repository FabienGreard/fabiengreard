import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

/* ROUTING */
import { routing } from './login.routing';

/* MODULES */

/* COMPONENTS */
import { LoginComponent } from './login.component';

/* SERVICES */

/* DIRECTIVES */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {}
