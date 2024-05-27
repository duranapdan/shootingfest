import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticPageRoutingModule } from './static-page-routing.module';
import { StaticPageListComponent } from './components/static-page-list/static-page-list.component';
import { StaticPageFormComponent } from './components/static-page-form/static-page-form.component';
import { StaticPageService } from './services/static-page.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        StaticPageListComponent,
        StaticPageFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        StaticPageRoutingModule,
        NgbModule
    ],
    providers: [StaticPageService]
})
export class StaticPageModule { }