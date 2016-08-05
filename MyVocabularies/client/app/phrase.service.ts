import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';

@Injectable()
export class PhraseService{
    private phraseUrl='api/v1/phrase';
    constructor(private http:Http){

    }
    getPhrase(){
        return this.http.get(this.phraseUrl).toPromise().then(response=>response.json());
    }
}