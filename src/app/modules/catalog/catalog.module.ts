
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { CatalogFormComponent } from './components/catalog-form/catalog-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogService } from './services/catalog.sevice';

@NgModule({
    declarations: [
        CatalogListComponent,
        CatalogFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        CatalogRoutingModule
    ],
    providers: [CatalogService],
})
export class CatalogModule { }