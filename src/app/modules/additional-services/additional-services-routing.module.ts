
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdditionalServiceFormComponent } from './components/additional-service-form/additional-service-form.component';
import { AdditionalServiceListComponent } from './components/additional-service-list/additional-service-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'edit/:code', component: AdditionalServiceFormComponent },
            { path: 'list', component: AdditionalServiceListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class AdditionalServicesRoutingModule { }
