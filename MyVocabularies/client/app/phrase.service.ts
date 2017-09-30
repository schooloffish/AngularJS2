import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhraseService {
    private phraseUrl = 'api/v1/phrase/';
    private allSentenceUrl = 'api/v1/allSentence';
    private allPhraseUrl = 'api/v1/allphrases';

    constructor(private http: Http) {

    }

    getPhrase(id:string) {
        return this.http.get(this.phraseUrl + id).toPromise().then(r => r.json());
    }

    getAllSentence() {
        return this.http.get(this.allSentenceUrl).toPromise().then(r => r.json());
    }

    getAllPhrases() {
        return this.http.get(this.allPhraseUrl).toPromise().then(r => r.json());
    }

    insertExample(phraseId:number, example:string) {
        return this.http.post(this.phraseUrl, {
            phraseId: phraseId,
            sentence: example
        }).toPromise().then(r => r.json());
    }
}