
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryService } from './services/category.service';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTreeModule } from '@angular/material/tree';
import { TreeModule } from 'primeng/tree';

@NgModule({
    declarations: [
        CategoryListComponent,
        CategoryFormComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        SharedModule,
        ReactiveFormsModule,
        CategoryRoutingModule,
        MatExpansionModule,
        NgbModule,
        MatTreeModule,
        TreeModule,
        FormsModule
    ],
    providers: [CategoryService],
})
export class CategoryModule { }