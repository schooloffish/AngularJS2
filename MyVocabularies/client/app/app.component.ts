import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {PhraseService} from './phrase.service.js';

@Component({
    selector:'my-app',
    templateUrl:'app/app.component.html',
    directives:[ROUTER_DIRECTIVES],
    providers:[PhraseService]
})
export class AppComponent{
    title='My New Vocabularies';
}