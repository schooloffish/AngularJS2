import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ribbon-application-item',
    templateUrl: 'app/ribbon/ribbon.application.item.component.html'
})
export class RibbonApplicationItemComponent {
    @Input()
    item;
    constructor() { }
}