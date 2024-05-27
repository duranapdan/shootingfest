import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationRoutingModule } from './translation-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationFormComponent } from './components/translation-form/translation-form.component';
import { TranslationService } from './services/translation.service';

@NgModule({
    declarations: [
        TranslationListComponent,
        TranslationFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        TranslationRoutingModule
    ],
    providers: [TranslationService]
})
export class TranslationModule { }