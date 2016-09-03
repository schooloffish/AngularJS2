import {ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PhraseComponent} from './phrase.component';
import {SentenceComponent} from './sentence.component';

const appRoutes: Routes = [
    { path: 'phrase', component: PhraseComponent },
    { path: 'sentence', component: SentenceComponent },
    { path: '', redirectTo: '/phrase', pathMatch: 'full' }];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);