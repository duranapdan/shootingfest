import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCancellationListComponent } from './components/order-cancellation-list/order-cancellation-list.component';
import { OrderCancellationFormComponent } from './components/order-cancellation-form/order-cancellation-form.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'list', component: OrderListComponent },
            { path: 'details/:id', component: OrderDetailsComponent },
            { path: 'cancellation-types/list', component: OrderCancellationListComponent },
            { path: 'cancellation-types/edit/:id', component: OrderCancellationFormComponent },
            { path: 'cancellation-types/create', component: OrderCancellationFormComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule],
})
export class OrderRoutingModule {}