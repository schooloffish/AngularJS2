import {Component, OnInit} from '@angular/core';
import {PhraseService} from './phrase.service';

@Component({
    selector: 'phrase',
    templateUrl: 'app/phrase.component.html'
})
export class PhraseComponent {
    phrase: any;
    constructor(private phraseService: PhraseService) {
    }
    ngOnInit() {
        this.phrase = this.phraseService.getPhrase().then(phrase => this.phrase = phrase);
    }
}