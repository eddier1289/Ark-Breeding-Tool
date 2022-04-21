import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DinoGroupsComponent} from "./components/dino-groups/dino-groups.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dinos'
  },
  {
    path: 'dinos',
    component: DinoGroupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
