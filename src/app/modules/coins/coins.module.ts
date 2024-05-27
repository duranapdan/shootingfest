import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsService } from './services/coins.service';
import { CoinRuleListComponent } from './components/coin-rule-list/coin-rule-list.component';
import { CoinPeriodListComponent } from './components/coin-period-list/coin-period-list.component';
import { CoinGiftListComponent } from './components/coin-gift-list/coin-gift-list.component';
import { CoinPeriodFormComponent } from './components/coin-period-form/coin-period-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoinMemberShipListComponent } from './components/coin-membership-list/coin-membership-list.component';
import { CoinMembershipFormComponent } from './components/coin-membership-form/coin-membership-form.component';
import { ProductService } from '../users/services/product.service';

@NgModule({
    declarations: [
        CoinRuleListComponent,
        CoinMemberShipListComponent,
        CoinPeriodListComponent,
        CoinGiftListComponent,
        CoinPeriodFormComponent,
        CoinMembershipFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        CoinsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule
    ],
    exports: [],
    providers: [
        CoinsService,
        ProductService
    ],
})
export class CoinsModule { }