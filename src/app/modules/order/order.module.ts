import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { OrderService } from './services/order.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrderCancellationListComponent } from './components/order-cancellation-list/order-cancellation-list.component';
import { OrderCancellationFormComponent } from './components/order-cancellation-form/order-cancellation-form.component';

@NgModule({
    declarations: [
        OrderListComponent,
        OrderDetailsComponent,
        OrderCancellationListComponent,
        OrderCancellationFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        NgbModule,
        PipesModule,
        ReactiveFormsModule,
        TranslateModule,
        OrderRoutingModule,
    ],
    exports: [],
    providers: [
        OrderService
    ],
})
export class OrderModule { }