import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhraseComponent} from './phrase.component';
import {WordListComponent} from './word.list.component';
import {SentenceComponent} from './sentence.component';

const appRoutes: Routes = [
    { path: 'phrase/:id', component: PhraseComponent },
    { path: 'allphrases', component: WordListComponent },
    { path: 'sentence', component: SentenceComponent },
    { path: '', redirectTo: '/phrase/0', pathMatch: 'full' }];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}