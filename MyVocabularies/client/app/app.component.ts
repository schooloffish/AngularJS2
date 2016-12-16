import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
})
export class AppComponent {
    title = 'My New Vocabularies';
    myTabs = [{
        title: 'file', items: [{
            title: 'group 1', items: [
                { title: 'item 1', icon: 'app/images/dashboard_bucket.png' },
                { title: 'item 2', icon: 'app/images/dashboard_map.png' }],
            type: 'group'
        },
        { type: 'separator' }, {
            title: 'group 2', items: [
                { title: 'item 7', icon: 'app/images/dashboard_office.png' },
                { title: 'item 8', icon: 'app/images/dashboard_worker.png' }],
            type: 'group'
        }]
    },
    {
        title: 'search', items: [{ title: 'item 3', icon: 'app/images/dashboard_office.png' },
        { title: 'item 4', icon: 'app/images/dashboard_worker.png' }]
    },
    {
        title: 'admin', items: [{ title: 'item 5', icon: 'app/images/role_admin.png' },
        { title: 'item 6', icon: 'app/images/role_admin.png' }]
    }];
}