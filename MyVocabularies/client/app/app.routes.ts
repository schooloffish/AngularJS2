import {ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhraseComponent} from './phrase.component';
import {WordListComponent} from './word.list.component';
import {SentenceComponent} from './sentence.component';

const appRoutes: Routes = [
    { path: 'phrase', component: PhraseComponent },
    { path: 'allphrases', component: WordListComponent },
    { path: 'sentence', component: SentenceComponent },
    { path: '', redirectTo: '/phrase', pathMatch: 'full' }];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);