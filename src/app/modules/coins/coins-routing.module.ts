
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoinGiftListComponent } from './components/coin-gift-list/coin-gift-list.component';
import { CoinMembershipFormComponent } from './components/coin-membership-form/coin-membership-form.component';
import { CoinMemberShipListComponent } from './components/coin-membership-list/coin-membership-list.component';
import { CoinPeriodFormComponent } from './components/coin-period-form/coin-period-form.component';
import { CoinPeriodListComponent } from './components/coin-period-list/coin-period-list.component';
import { CoinRuleListComponent } from './components/coin-rule-list/coin-rule-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            // { path: 'create', component: PromotionsFormComponent },
            { path: 'rules', component: CoinRuleListComponent },

            { path: 'memberships', component: CoinMemberShipListComponent },
            { path: 'memberships/create', component: CoinMembershipFormComponent },
            { path: 'memberships/edit/:id', component: CoinMembershipFormComponent },

            { path: 'periods', component: CoinPeriodListComponent },
            { path: 'periods/create', component: CoinPeriodFormComponent },
            { path: 'periods/edit/:id', component: CoinPeriodFormComponent },

            { path: 'gifts', component: CoinGiftListComponent },
            { path: '**', redirectTo: 'rules', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class CoinsRoutingModule { }
