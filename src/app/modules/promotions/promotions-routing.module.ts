
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PromotionsFormComponent } from './components/promotion-form/promotions-form.component';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: PromotionsFormComponent },
            { path: 'edit/:id', component: PromotionsFormComponent },
            { path: 'list', component: PromotionListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class PromotionsRoutingModule { }
