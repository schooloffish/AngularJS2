import { provideRouter, RouterConfig } from '@angular/router';
import {PhraseComponent} from './phrase.component';
import {SentenceComponent} from './sentence.component';

const routes: RouterConfig = [
    { path: 'phrase', component: PhraseComponent },
    { path: 'sentence', component: SentenceComponent },
    { path: '', redirectTo: '/phrase', pathMatch: 'full' }];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];