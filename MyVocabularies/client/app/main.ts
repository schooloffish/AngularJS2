/**
 * Created by liuxun on 7/14/2016.
 */
import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {APP_ROUTER_PROVIDERS} from './app.routes';

bootstrap(AppComponent, [APP_ROUTER_PROVIDERS, HTTP_PROVIDERS]);