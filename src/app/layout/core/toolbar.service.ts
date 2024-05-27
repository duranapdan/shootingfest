import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToolbarService {
    @Output() public create = new EventEmitter();
    public get isCreateVisible(): boolean {
        return this.create.observed;
    }
    private _isVisible:boolean = false
    public get isVisible():boolean{
        return this._isVisible 
    }

    isVisibleToCreate(bool:boolean){
        this._isVisible = bool
        console.log(this._isVisible)
    }
}