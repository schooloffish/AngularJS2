import { Component, OnInit } from '@angular/core';
import { PhraseService } from './phrase.service';

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
    showNext: boolean;
    constructor(private phraseService: PhraseService) {
        this.title = '';
        this.phrase = {};
        this.audio = new Audio();
        this.example = '';
    }
    ngOnInit() {
        this.showMeaning = false;
        this.showNext = false;
        this.phraseService.getPhrase().subscribe(data => {
            this.phrase = data;
            this.play();
        });
    }

    private play() {
        this.audio.onended = () => {
            this.audio.onended = null;
            if (this.phrase.sentences.length) {
                this.audio.src = 'http://dict.youdao.com/dictvoice?audio=' + this.phrase.sentences[0] + '&type=2';
                this.audio.play();
            }
        };
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