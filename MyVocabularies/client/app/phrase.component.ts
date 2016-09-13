import {Component, OnInit} from '@angular/core';
import {PhraseService} from './phrase.service';

@Component({
    selector: 'phrase',
    templateUrl: 'app/phrase.component.html'
})
export class PhraseComponent {
    phrase: any;
    title: string;
    audio: any;
    showMeaning: boolean;
    keycode: any;
    example: string;
    constructor(private phraseService: PhraseService) {
        this.title = 'All Phrases';
        this.phrase = {};
        this.audio = new Audio();
        this.showMeaning = false;
        this.example = '';
    }
    ngOnInit() {
        this.phraseService.getPhrase().subscribe(data => {
            this.phrase = data[0];
            this.play();
        });
    }

    private play() {
        let phrase = this.phrase.phrase;
        this.audio.pause();
        this.audio.src = 'http://dict.youdao.com/dictvoice?audio=' + phrase + '&type=2';
        this.audio.play();
    }

    onKey(event) {
        if (event.code === 'ArrowRight') {
            this.next();
        }
        else if (event.code === 'KeyP') {
            this.play();
        }
    }

    next() {
        this.ngOnInit();
    }

    addExample() {
        this.phraseService.insertExample(this.phrase.phrase_id, this.example).subscribe(data => {
            console.log(data);
        })
    }
}