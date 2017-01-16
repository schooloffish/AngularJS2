import { Injectable } from '@angular/core';
import * as _ from 'lodash';

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

    findTabItem(itemName) {
        let target = _.find(this.tabs, { name: itemName });
        if (target) {
            return target;
        }
        else {
            for (let tab of this.tabs) {
                target = _.find(tab.groups, { name: itemName });
                if (target) return target;

                target = _.find(tab.items, { name: itemName });
                if (target) return target;

                for (let group of tab.groups) {
                    target = _.find(group.items, { name: itemName });
                    if (target) {
                        return target;
                    }
                }
            }
        }
    }

    getApplicationItems() {
        return this.applicationItems;
    }

    findApplicationItem(itemName) {
        return _.find(this.applicationItems, { name: itemName });
    }
}