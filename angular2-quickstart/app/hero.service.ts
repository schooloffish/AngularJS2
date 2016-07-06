/**
 * Created by liuxun on 7/6/2016.
 */
import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService {
    getHeroes() {
        return new Promise<Hero[]>(
            resolve=>
                setTimeout(()=>resolve(HEROES), 2000)
        );
    }
}