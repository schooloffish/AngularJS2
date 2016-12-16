import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ribbon-bar',
    templateUrl: 'app/ribbon/ribbon.bar.component.html'
})
export class RibbonBarComponent {
    @Input()
    tabs;
    activeTab;

    constructor() {
    }

    ngOnInit() {
        this.activeTab = this.tabs[0];
        this.activeTab.active = true;
    }

    tabClicked(tab) {
        if (this.activeTab !== tab) {
            this.activeTab && (this.activeTab.active = false);
            this.activeTab = tab;
            this.activeTab.active = true;
        }
    }
}