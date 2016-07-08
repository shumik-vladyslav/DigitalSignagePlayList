/**
 * Created by Vlad on 6/28/2016.
 */
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { provide } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTER_PROVIDERS } from './routes';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue : '/' })]);
