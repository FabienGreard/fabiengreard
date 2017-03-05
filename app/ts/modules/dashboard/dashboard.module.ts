import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ROUTING */
import { routing } from './dashboard.routing';

/* MODULES */
import { ArticleModule } from '../article/index';
import { LoginModule } from '../login/index';

/* COMPONENTS */
import { DashboardComponent } from './components/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header.component';
import { DashboardContentComponent } from './components/dashboard-content.component';
import { DashboardInfoComponent } from './components/dashboard-info.component';
import { DashboardSocialComponent } from './components/dashboard-social.component';
import { DashboardTagComponent } from './components/dashboard-tag.component';
import { DashboardFooterComponent } from './components/dashboard-footer.component';

/* SERVICES */
import { DashboardTagService } from './services/dashboard-tag.service';

/* DIRECTIVES */

@NgModule({
  imports: [
    CommonModule,
    routing,
    ArticleModule,
    LoginModule
  ],
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardContentComponent,
    DashboardInfoComponent,
    DashboardSocialComponent,
    DashboardTagComponent,
    DashboardFooterComponent
  ],
  providers:[DashboardTagService],
  exports: [DashboardComponent]
})
export class DashboardModule {}
