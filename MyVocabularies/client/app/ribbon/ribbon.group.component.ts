import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ribbon-group',
    templateUrl: 'app/ribbon/ribbon.group.component.html'
})
export class RibbonGroupComponent {
    @Input()
    group;
    constructor() { }
}