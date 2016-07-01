/**
 * Created by Vlad on 6/28/2016.
 */
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './routes';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [provideRouter(AppRoutes), provide(APP_BASE_HREF, {useValue : '/' })]);
