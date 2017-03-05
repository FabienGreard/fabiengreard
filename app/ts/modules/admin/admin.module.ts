import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

/* ROUTING */
import { routing } from './admin.routing';

/* MODULES */
import { AlertModule } from '../alert/index';

/* COMPONENTS */
import { AdminComponent } from './components/admin.component';
import { AdminArticleComponent } from './components/admin-article.component';
import { AdminUserComponent } from './components/admin-user.component';

/* SERVICES */
import { AuthGuard } from '../../guards/auth.guard';
import { UserService} from '../../services/api/index';

/* DIRECTIVES */
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    routing,
    AlertModule
  ],
  declarations: [
    AdminComponent,
    AdminArticleComponent,
    AdminUserComponent
  ],
  providers: [
    AuthGuard,
    UserService
  ]
})
export class AdminModule { }
