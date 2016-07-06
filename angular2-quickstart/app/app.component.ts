/**
 * Created by liuxun on 7/6/2016.
 */
import {Component} from '@angular/core';
import {HeroService} from './hero.service';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
        selector: 'my-app',
        template: `
            <h1>{{title}}</h1>
            <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
             <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
            <router-outlet></router-outlet>
            `,
    directives: [ROUTER_DIRECTIVES],
    providers: [HeroService]
    }
)
export class AppComponent {
    title = 'Tour of Heroes';
}