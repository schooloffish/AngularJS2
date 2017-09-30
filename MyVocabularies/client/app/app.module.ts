import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PhraseComponent } from './phrase.component';
import { SentenceComponent } from './sentence.component';
import { WordListComponent } from './word.list.component';
import { PhraseService } from './phrase.service';
import { AppRoutingModule } from './app.routes';
import { SimpleValidationFormComponent } from './simple.validation.form.component';
import { MessagesValidationFormComponent } from './messages.validation.form.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PhraseComponent,
        SentenceComponent,
        WordListComponent,
        SimpleValidationFormComponent,
        MessagesValidationFormComponent
    ],
    providers: [
        PhraseService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}