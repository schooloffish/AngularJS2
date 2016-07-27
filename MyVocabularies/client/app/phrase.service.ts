import {Injectable} from '@angular/core';

@Injectable()
export class PhraseService{
    private phraseUrl='api/v1/phrase';
    constructor(private http:Http){

    }
    getPhrases(){
        this.http.get(this.phraseUrl).toPromise().then(response=>response.json())
    }
}