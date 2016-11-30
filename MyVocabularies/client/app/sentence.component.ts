/**
 * Created by liuxun on 7/14/2016.
 */
import {Component, OnInit} from '@angular/core';
import {PhraseService} from './phrase.service'

@Component({
    selector: 'sentence',
    templateUrl: 'app/sentence.component.html'
})
export class SentenceComponent {
    vocabularies = ['The potato was hot, so I fumbled and dropped it.haha',
        'Writing such push/pull logic by hand is tedious, error-prone, and a nightmare to read as any experienced jQuery programmer can attest.'];
    audio; any;

    constructor(private phraseService: PhraseService) {
        this.audio = new Audio();
    }

    ngOnInit() {
        this.phraseService.getAllSentence().then(data => {
            this.vocabularies = data;
        });
    }

    getAllSentence

    play(phrase) {
        this.audio.pause();
        this.audio.src = `http://dict.youdao.com/dictvoice?audio=${phrase}&type=2`;
        this.audio.play();
    }
}