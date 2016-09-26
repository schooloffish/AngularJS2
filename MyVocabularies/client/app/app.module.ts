import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PhraseComponent} from './phrase.component';
import {SentenceComponent} from './sentence.component';
import {WordListComponent} from './word.list.component';
import {PhraseService} from './phrase.service';
import {routing} from './app.routes';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        PhraseComponent,
        SentenceComponent,
        WordListComponent
    ],
    providers: [
        PhraseService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}