
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SystemParameterFormComponent } from './components/system-parameter-form/system-parameter-form.component';
import { SystemParameterListComponent } from './components/system-parameter-list/system-parameter-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: SystemParameterFormComponent },
            { path: 'edit/:id', component: SystemParameterFormComponent },
            { path: 'list', component: SystemParameterListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class SystemParameterRoutingModule { }
