
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankInfoFormComponent } from './components/bank-info-form/bank-info-form.component';
import { BankInfoListComponent } from './components/bank-info-list/bank-info-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: BankInfoFormComponent },
            { path: 'edit/:id', component: BankInfoFormComponent },
            { path: 'list', component: BankInfoListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class BankInfoRoutingModule { }
