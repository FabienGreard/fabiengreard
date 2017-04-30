import { NgModule } from '@angular/core';

/* ROUTING */

/* MODULES */

/* COMPONENTS */
import { DisqusComponent } from './disqus.component';

/* SERVICES */
import { DisqusService } from './disqus.service';

/* DIRECTIVES */

@NgModule({
  declarations: [DisqusComponent],
  providers: [DisqusService],
  exports: [DisqusComponent]
})
export class DisqusModule {}
