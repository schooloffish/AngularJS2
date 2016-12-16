/**
 * Created by liuxun on 7/14/2016.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(sucess => {
    console.log('bootstrap success.');
}).catch(err => console.error(err && err.message));