import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationEntryComponent } from './components/translation-entry/translation-entry.component';
import { FormsModule } from '@angular/forms';
import { ToastsContainerComponent } from './components/toasts/toasts-container.component';
import { ToastService } from './services/toast.service';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        TranslationEntryComponent,
        ToastsContainerComponent,
        SearchComponent,
        GoogleMapComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbToastModule,
        EditorModule,
        NgbModule,
        GoogleMapsModule,
        MatTreeModule,
        MatExpansionModule,
        PipesModule
    ],
    exports: [
        TranslationEntryComponent,
        ToastsContainerComponent,
        SearchComponent,
        GoogleMapComponent,
    ],
    providers: [
        ToastService,
    ],
})
export class SharedModule { }
