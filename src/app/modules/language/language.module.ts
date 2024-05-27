import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LanguageListComponent } from './components/language-list/language-list.component';
import { LanguageFormComponent } from './components/language-form/language-form.component';
import { LanguageService } from './components/services/language.service';
import { LanguageRoutingModule } from './language-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    declarations: [
        LanguageListComponent,
        LanguageFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        LanguageRoutingModule,
        PipesModule,
    ],
    exports: [],
    providers: [
        LanguageService
    ],
})
export class LanguageModule { }