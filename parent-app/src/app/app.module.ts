import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {IframeComponent} from './iframe/iframe.component';

const URL_PREFIX = 'http://localhost:3000/#';

const barData = {className: 'bar', url: URL_PREFIX + 'bar'};
const fooData = {className: 'foo', url: URL_PREFIX + 'foo'};
const appRoutes: Routes = [
  {path: 'foo/:make/:model', component: IframeComponent, data: fooData},
  {path: 'bar', component: IframeComponent, data: barData},
  {path: '**', component: IframeComponent, data: fooData}
];

@NgModule({
  declarations: [AppComponent, IframeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
