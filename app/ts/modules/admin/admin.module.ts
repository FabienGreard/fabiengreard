import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

/* ROUTING */
import { routing } from './admin.routing';

/* MODULES */
import { AlertModule } from '../alert/index';

/* COMPONENTS */
import { AdminComponent } from './components/admin.component';

/* SERVICES */
import { AuthGuard } from '../../guards/auth.guard';
import { AuthentificationService} from '../../services/api/index';

/* DIRECTIVES */
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    routing,
    AlertModule
  ],
  declarations: [
    AdminComponent
  ],
  providers: [
    AuthGuard,
    AuthentificationService
  ]
})
export class AdminModule { }
