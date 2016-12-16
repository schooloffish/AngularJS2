import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ribbon-item',
    templateUrl: 'app/ribbon/ribbon.item.component.html'
})
export class RibbonItemComponent {
    @Input()
    item;
    constructor() { }
}