import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ribbon-tab',
    templateUrl: 'app/ribbon/ribbon.tab.component.html'
})
export class RibbonTabComponent {
    @Input()
    tab;
    @Output()
    tabClicked = new EventEmitter();


    constructor() {
    }

    onClick() {
        this.tabClicked.emit(this.tab);
    }
}