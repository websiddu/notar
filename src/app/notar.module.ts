import { enableProdMode, NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { NotarAppComponent }   from './notar.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, routingProviders } from './notar.routing';

import { DocsComponent } from './+docs';
import { DocComponent } from './+docs/doc';
import { LoginComponent } from './+login';

import { Config } from './shared/services/config.service';
import { AuthGuard } from './shared/services/auth/auth.guard.service';
import { AuthService } from './shared/services/auth/auth.service';
import { ApiService } from './shared/services/api/api.service';
import { DocService } from './shared/services/doc/doc.service';
import { UtilService } from './shared/services/util.service';

enableProdMode();

let firebaseConfig = {
    apiKey: 'AIzaSyCNuE4FTljf5fa4mPOowxT2vmLae6XHyRo',
    authDomain: 'project-1922609808476689818.firebaseapp.com',
    databaseURL: 'https://project-1922609808476689818.firebaseio.com',
    storageBucket: 'project-1922609808476689818.appspot.com'
};


@NgModule({
    declarations: [
        NotarAppComponent,
        DocsComponent,
        DocComponent,
        LoginComponent,
    ],
    providers: [
        routingProviders,
        Config,
        AuthGuard,
        AuthService,
        ApiService,
        DocService,
        UtilService
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        // AngularFireModule.initializeApp(firebaseConfig)
    ],
    bootstrap: [NotarAppComponent],
})
export class NotarAppModule {

};

