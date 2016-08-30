import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {PhraseService} from './phrase.service';
import {SentenceComponent} from './sentence.component';
import {PhraseComponent} from './phrase.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PhraseService],
    precompile: [SentenceComponent, PhraseComponent]
})
export class AppComponent {
    title = 'My New Vocabularies';
}