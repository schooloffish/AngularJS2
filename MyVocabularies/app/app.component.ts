/**
 * Created by liuxun on 7/14/2016.
 */
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    vocabularies = ['The potato was hot, so I fumbled and dropped it.',
        'Writing such push/pull logic by hand is tedious, error-prone, and a nightmare to read as any experienced jQuery programmer can attest.'];
    audio;any;

    constructor() {
        this.audio = new Audio();
    }

    play (phrase) {
        this.audio.pause();
        this.audio.src='http://dict.youdao.com/dictvoice?audio=' + phrase + '&type=2';
        this.audio.play();
    }
}