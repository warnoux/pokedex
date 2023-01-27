import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RightPartComponent } from './right-part/right-part.component';
import { LeftPartComponent } from './left-part/left-part.component';
import { HttpClientModule } from '@angular/common/http';
import { LongPressDirective } from './long-press.directive';
import { KeyGameBoyComponent } from './right-part/key-game-boy/key-game-boy.component';
import { KeyHDComponent } from './right-part/key-hd/key-hd.component';

@NgModule({
  declarations: [
    AppComponent,
    RightPartComponent,
    LeftPartComponent,
    LongPressDirective,
    KeyGameBoyComponent,
    KeyHDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
