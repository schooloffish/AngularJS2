import { Injectable } from '@angular/core';

@Injectable()
export class RibbonBarService {
    private tabs;
    private applicationItems;

    constructor() {
    }

    initRibbon(tabs, applicationItems) {
        this.tabs = tabs;
        this.applicationItems = applicationItems;
    }

    getTabs() {
        return this.tabs;
    }

    getApplicationItems() {
        return this.applicationItems;
    }
}