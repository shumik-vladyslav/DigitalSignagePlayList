/**
 * Created by Vlad on 6/28/2016.
 */
import { bootstrap }    from '@angular/platform-browser-dynamic';

import { HTTP_PROVIDERS } from '@angular/http';

//import { Configuration } from './app.constants';
//import { SecurityService } from './services/SecurityService';
//import { APP_ROUTER_PROVIDERS } from './app.routes';

import { provideRouter } from '@angular/router';
import { AppRoutes } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
    provideRouter(AppRoutes),
    HTTP_PROVIDERS
]).catch(err => console.error(err));
