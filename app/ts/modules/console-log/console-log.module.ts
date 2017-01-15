import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ROUTING */

/* MODULES */

/* COMPONENTS */
import { ConsoleLogComponent } from './console-log.component';

/* SERVICES */
import { ConsoleLogService } from './console-log.service';

/* DIRECTIVES */
import { MoveAnythingDirective } from '../../directives/index';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ConsoleLogComponent,
    MoveAnythingDirective
  ],
  providers: [ConsoleLogService],
  exports: [ConsoleLogComponent]
})
export class ConsoleLogModule {}
