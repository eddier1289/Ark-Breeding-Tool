import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DinoBreedingComponent } from './components/dino-breeding/dino-breeding.component';
import { DinoStatsComponent } from './components/dino-stats/dino-stats.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { BestPossibleDinoComponent } from './components/best-possible-dino/best-possible-dino.component';
import {DinosaurService} from "./services/dinosaur.service";
import { AddDinoComponent } from './components/add-dino/add-dino.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DinoBreedingComponent,
    DinoStatsComponent,
    BestPossibleDinoComponent,
    AddDinoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
  providers: [
    {
      provide: DinosaurService, useClass: DinosaurService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
