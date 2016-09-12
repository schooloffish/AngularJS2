import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhraseService {
    private phraseUrl = 'api/v1/phrase';
    constructor(private http: Http) {

    }
    getPhrase() {
        return this.http.get(this.phraseUrl).map(function (r) {
            return r.json();
        });
    }
}