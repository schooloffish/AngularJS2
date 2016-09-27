import {Component, OnInit} from '@angular/core';
import {PhraseService} from './phrase.service';

@Component({
    selector: 'wordlist',
    templateUrl: 'app/word.list.component.html'
})
export class WordListComponent {
    allPhrases: string[];
    constructor(private phraseService: PhraseService) {
        this.allPhrases = [];
    }

    ngOnInit() {
        this.phraseService.getAllPhrases().subscribe(data => {
            this.allPhrases = data;
        })
    }
}