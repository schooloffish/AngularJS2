import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
})
export class AppComponent {
    title = 'My New Vocabularies';
    myTabs = [{
        title: 'file', groups: [{
            title: 'group 1', items: [
                { title: 'item 1', icon: 'app/images/dashboard_bucket.png', type: 'button' },
                { title: 'item 2', icon: 'app/images/dashboard_map.png', type: 'button' },
                {
                    title: 'dropdown', icon: 'app/images/dashboard_map.png', type: 'dropdown', items: [
                        { title: 'dropdown 1', click: () => { alert('1'); } },
                        { title: 'dropdown 2', click: () => { alert('1'); } },
                        { title: 'dropdown 3', click: () => { alert('1'); } }
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
        title: 'search', items: [{ title: 'item 3', icon: 'app/images/dashboard_office.png', type: 'button' },
        { title: 'item 4', icon: 'app/images/dashboard_worker.png', type: 'button' }, {
            title: 'Approve Count: 0 <br> QCCount:0',
            type: 'text'
        }]
    },
    {
        title: 'admin', items: [{ title: 'item 5', icon: 'app/images/role_admin.png', type: 'button' },
        { title: 'item 6', icon: 'app/images/role_admin.png', type: 'button' }]
    }];
}