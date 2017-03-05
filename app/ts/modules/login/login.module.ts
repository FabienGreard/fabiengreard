import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* ROUTING */

/* MODULES */
import { AlertModule } from '../alert/index';

/* COMPONENTS */
import { LoginComponent } from './components/login.component';

/* SERVICES */
import { AuthentificationService} from '../../services/api/index';

/* DIRECTIVES */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AlertModule
  ],
  declarations: [LoginComponent],
  providers: [AuthentificationService]
})
export class LoginModule {}
