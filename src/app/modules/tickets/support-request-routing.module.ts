
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketEditComponent } from './components/edit/ticket-edit.component';
import { TicketListComponent} from './components/list/ticket-list.component';
import { TicketTypeListComponent } from './components/ticket-type-list/ticket-type-list.component';
import { TicketTypeFormComponent } from './components/ticket-type-form/ticket-type-form.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'edit/:code', component: TicketEditComponent},
            { path: 'list', component: TicketListComponent},
            { path: 'ticket-types/list', component: TicketTypeListComponent},
            { path: 'ticket-types/create', component: TicketTypeFormComponent},
            { path: 'ticket-types/edit/:id', component: TicketTypeFormComponent},
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class SupportRequestRoutingModule { }
