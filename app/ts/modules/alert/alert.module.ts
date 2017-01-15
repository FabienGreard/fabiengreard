import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ROUTING */

/* MODULES */

/* COMPONENTS */
import { AlertComponent } from './alert.component';

/* SERVICES */
import { AlertService } from './alert.service';

/* DIRECTIVES */

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent],
  providers: [AlertService],
  exports: [AlertComponent]
})
export class AlertModule {}
