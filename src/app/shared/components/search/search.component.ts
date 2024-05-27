import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    //
    @Output() public searchTextOutput = new EventEmitter();

    //
    public searchText: string = '';

    constructor() { }

    //
    ngOnInit(): void { }

    //
    public onSubmitSearchTextClick(): void {
        this.searchTextOutput.emit(this.searchText);
    }

    //
    public onResetSearchClick(): void {
        this.searchText = '';
        this.searchTextOutput.emit('');
    }

    onTest() {
        console.log("test");

    }
}
