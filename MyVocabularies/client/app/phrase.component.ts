import { Component, OnInit } from '@angular/core';
import { PhraseService } from './phrase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'phrase',
    templateUrl: 'phrase.component.html'
})
export class PhraseComponent {
    phrase: any;
    title: string;
    audio: any;
    showMeaning: boolean;
    keycode: any;
    example: string;
    showNext: boolean;
    showAddExample: boolean;    

    constructor(private phraseService: PhraseService,
        private route: ActivatedRoute,
        private router: Router) {
        this.title = '';
        this.phrase = {};
        this.audio = new Audio();
        this.example = '';
    }
    
    ngOnInit() {
        let id = this.route.params.subscribe((params) => {
            this.showMeaning = false;
            this.showAddExample = false;
            this.showNext = false;
            this.phraseService.getPhrase(params['id']).then(data => {
                this.phrase = data;
                this.play();
            });
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

    onKey(event:any) {
        if (event.code === 'ArrowRight') {
            this.next();
        }
        else if (event.code === 'KeyP') {
            this.play();
        }
    }

    remember() {
        this.next();
    }

    next() {
        this.ngOnInit();
    }

    addExample() {
        this.phraseService.insertExample(this.phrase.phrase_id, this.example).then(data => {
            console.log(data);
        })
    }
}