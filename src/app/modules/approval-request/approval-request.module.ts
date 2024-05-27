import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalRequestRoutingModule } from './approval-request-routing.module';
import { ApprovalRequestService } from './services/approval-request.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ApprovalRequestListComponent } from './components/approval-request-list/approval-request-list.component';
import { TokenInterceptor } from '../auth/interceptors/token.interceptor';
import { DataListingPipe } from './pipes/data-listing.pipe';
import { CompanyIdPipe } from './pipes/company-id.pipe';
import { ApprovalRejectFormComponent } from './components/reject-form/reject-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        ApprovalRequestListComponent,
        CompanyIdPipe,
        DataListingPipe,
        ApprovalRejectFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
        ApprovalRequestRoutingModule
    ],
    exports: [],
    providers: [ApprovalRequestService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]
})
export class ApprovalRequestModule { }
