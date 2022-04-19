import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DinoBreedingComponent } from './components/dino-breeding/dino-breeding.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dinos'
  },
  {
    path: 'dinos',
    component: DinoBreedingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
