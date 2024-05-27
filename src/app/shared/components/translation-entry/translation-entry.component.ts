import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationEntryDto } from '../../models/translation-entry.dto';

@Component({
    selector: 'app-translation-entry',
    templateUrl: './translation-entry.component.html',
    styleUrls: ['./translation-entry.component.scss']
})
export class TranslationEntryComponent {
    @Input() public placeholder: string = '';
    @Input() public mode: 'text' | 'wysiwyg' = 'text';
    
    @Input() public entries: Array<TranslationEntryDto> = [];
    @Output() public change = new EventEmitter();

    onRightClick(event:any) {
        event.preventDefault() //this will disable default action of the context menu
        //there will be your code for the expected right click action
       }
}
