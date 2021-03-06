import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDocFolderService} from './mockAPI/in-memory-doc-folder-service';
import { environment } from 'environments/environment';
import { CoreModule } from './core/core.module';
import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/user/user.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    environment.production ?
    [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDocFolderService),
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    CoreModule,
    HomeModule,
    UserModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
