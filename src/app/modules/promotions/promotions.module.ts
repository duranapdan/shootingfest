import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PromotionService } from './services/promotion.service';
import { PromotionsFormComponent } from './components/promotion-form/promotions-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../users/services/product.service';
import { CoinsService } from '../coins/services/coins.service';
import { CustomerService } from '../customer/services/customer.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        PromotionListComponent,
        PromotionsFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        PromotionsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule
    ],
    exports: [],
    providers: [
        PromotionService,
        CoinsService,
        ProductService,
        CustomerService
    ],
})
export class PromotionsModule { }