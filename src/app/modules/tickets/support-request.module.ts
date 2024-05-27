
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportRequestService } from './services/support-request.sevice';
import { SupportRequestTypePipe } from './pipes/support-request-type.pipe';
import { TicketListComponent } from './components/list/ticket-list.component';
import { SupportRequestRoutingModule } from './support-request-routing.module';
import { TicketEditComponent } from './components/edit/ticket-edit.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/interceptors/token.interceptor';
import { TicketTypeListComponent } from './components/ticket-type-list/ticket-type-list.component';
import { TicketTypeFormComponent } from './components/ticket-type-form/ticket-type-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        TicketListComponent,
        TicketEditComponent,
        SupportRequestTypePipe,
        TicketTypeListComponent,
        TicketTypeFormComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        SupportRequestRoutingModule,
        NgbModule
    ],
    providers: [SupportRequestService,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class SupportRequestModule { }