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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { DinoGroupsComponent } from './components/dino-groups/dino-groups.component';
import {MatTabsModule} from "@angular/material/tabs";
import { WildDinoStatsComponent } from './components/wild-dino-stats/wild-dino-stats.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    DinoBreedingComponent,
    DinoStatsComponent,
    BestPossibleDinoComponent,
    AddDinoComponent,
    DinoGroupsComponent,
    WildDinoStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: DinosaurService, useClass: DinosaurService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
