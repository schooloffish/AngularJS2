import { Component, OnInit, Input } from '@angular/core';
import { RibbonBarService } from './ribbon.bar.service'

@Component({
    selector: 'ribbon-bar',
    templateUrl: 'app/ribbon/ribbon.bar.component.html',
    inputs: ['tabs', 'items']
})
export class RibbonBarComponent {
    tabs;
    items;
    activeTab;

    constructor(private ribbonBarService: RibbonBarService) {
    }

    ngOnInit() {
        this.tabs = this.ribbonBarService.getTabs();
        this.items = this.ribbonBarService.getApplicationItems();
        this.activeTab = this.tabs[0];
        this.activeTab.active = true;
        for (let item of this.items) {
            console.log(`item.title: ${item.title}`);
        }
    }

    tabClicked(tab) {
        if (this.activeTab !== tab) {
            this.activeTab && (this.activeTab.active = false);
            this.activeTab = tab;
            this.activeTab.active = true;
        }
    }
}