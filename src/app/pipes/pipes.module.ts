import { NgModule } from '@angular/core';
import pipes from '.';

@NgModule({
    declarations: [
        ...pipes
    ],
    exports: [
        ...pipes
    ],
})
export class PipesModule { } 