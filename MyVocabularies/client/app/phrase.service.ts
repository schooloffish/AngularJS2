import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhraseService {
    private phraseUrl = 'api/v1/phrase';
    constructor(private http: Http) {

    }
    getPhrase() {
        return this.http.get(this.phraseUrl).toPromise().then(r => r.json());
    }

    getAllSentence(){
        return this.http.get('api/v1/allSentence').toPromise().then(r => r.json());
    }

    getAllPhrases() {
        return this.http.get('api/v1/allphrases').toPromise().then(r => r.json());
    }

    insertExample(phraseId, example) {
        return this.http.post(this.phraseUrl, {
            phraseId: phraseId,
            sentence: example
        }).toPromise().then(r => r.json());
    }
}