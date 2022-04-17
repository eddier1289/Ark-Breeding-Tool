import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DinoBreedingComponent } from './components/dino-breeding/dino-breeding.component';
import { DinoStatsComponent } from './components/dino-stats/dino-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    DinoBreedingComponent,
    DinoStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
