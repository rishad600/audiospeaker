import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule ,JsonpModule} from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import {WordComponent} from './word/word.component';
import {PlayerComponent} from './player/player.component';
import {VisualiserComponent} from './visualiser/visualiser.component';

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    PlayerComponent,
    VisualiserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
