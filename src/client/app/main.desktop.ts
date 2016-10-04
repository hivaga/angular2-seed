/* Created by hivaga on 7/7/2016. */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';

var electronGlobal = global;

if (String('<%= ENV %>') === 'prod') { enableProdMode(); }

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
