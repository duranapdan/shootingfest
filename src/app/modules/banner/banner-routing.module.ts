
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerFormComponent } from './components/banner-form/banner-form.component';
import { BannerListComponent } from './components/banner-list/banner-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: BannerFormComponent },
            { path: 'edit/:id', component: BannerFormComponent },
            { path: 'list', component: BannerListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
        ])
    ],
    exports: [RouterModule]
})
export class BannerRoutingModule { }
