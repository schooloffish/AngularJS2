import { Component, OnInit } from '@angular/core';
import { RibbonBarService } from './ribbon/ribbon.bar.service';
import * as _ from 'lodash';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
})
export class AppComponent {
    title = 'My New Vocabularies';
    constructor(private ribbonBarService: RibbonBarService) {
    }

    ngOnInit() {
        let myTabs = [{
            title: 'file', type: 'tab', groups: [{
                title: 'group 1', items: [
                    {
                        title: 'item 1', icon: 'app/images/dashboard_bucket.png', type: 'button', click: () => {
                            console.log(`lodash version: ${_.VERSION}`);
                        }
                    },
                    { title: 'item 2', icon: 'app/images/dashboard_map.png', type: 'button' },
                    {
                        name: 'dashboardItem',
                        title: 'dropdown', icon: 'app/images/dashboard_map.png', type: 'dropdown', items: [
                            {
                                name: 'bucketModeItem',
                                title: 'dropdown 1', icon: 'app/images/dashboard_bucket.png', click: () => {
                                    // consider put all the ribbon tabs/items into service, and then change items' title/icon via service like what we did in current fc
                                    let target = this.ribbonBarService.findTabItem('dashboardItem');
                                    target.title = 'dropdown 1';
                                    target.icon = 'app/images/dashboard_bucket.png';
                                }
                            },
                            {
                                name: 'officeModeItem',
                                title: 'dropdown 2', icon: 'app/images/dashboard_office.png', click: () => {
                                    let target = this.ribbonBarService.findTabItem('dashboardItem');
                                    target.title = 'dropdown 2';
                                    target.icon = 'app/images/dashboard_office.png';
                                }
                            },
                            {
                                name: 'workerModeItem',
                                title: 'dropdown 3', icon: 'app/images/dashboard_worker.png', click: () => {
                                    let target = this.ribbonBarService.findTabItem('dashboardItem');
                                    target.title = 'dropdown 3';
                                    target.icon = 'app/images/dashboard_worker.png';
                                }
                            }
                        ]
                    }],
                type: 'group'
            },
            { type: 'separator' }, {
                title: 'group 2', items: [
                    { title: 'item 7', icon: 'app/images/dashboard_office.png', type: 'button' },
                    { title: 'item 8', icon: 'app/images/dashboard_worker.png', type: 'button' }],
                type: 'group'
            }]
        },
        {
            title: 'search', type: 'tab', items: [{ title: 'item 3', icon: 'app/images/dashboard_office.png', type: 'button' },
            { title: 'item 4', icon: 'app/images/dashboard_worker.png', type: 'button' }, {
                title: 'Approve Count: 0 <br> QCCount:0',
                type: 'text'
            }]
        },
        {
            title: 'admin', type: 'tab', items: [{ title: 'item 5', icon: 'app/images/role_admin.png', type: 'button' },
            { title: 'item 6', icon: 'app/images/role_admin.png', type: 'button' }]
        }];

        let myItems = [{
            title: 'welcome to xxx',
            type: 'applicationText'
        }, {
            title: '',
            icon: 'app/images/toggle.png',
            type: 'applicationDropdown',
            items: [
                { icon: 'app/images/fullscreen.png' },
                { icon: 'app/images/logoff.png' }
            ]
        }, {
            title: '',
            class: 'glyphicon glyphicon-chevron-up mar-t-10',
            type: 'applicationButton'
        }];

        this.ribbonBarService.initRibbon(myTabs, myItems);
    }
}