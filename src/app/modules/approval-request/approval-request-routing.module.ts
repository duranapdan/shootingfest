import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApprovalRequestListComponent } from './components/approval-request-list/approval-request-list.component';
import { ApprovalRejectFormComponent } from './components/reject-form/reject-form.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ApprovalRequestListComponent },
            { path: 'reject', component: ApprovalRejectFormComponent },
        ])
    ],
    exports: [RouterModule],
})
export class ApprovalRequestRoutingModule { }
