import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './module/home/projects-list/projects-list.component';
import { FunctionalitiesLitsComponent } from './module/functionalities-lits/functionalities-lits.component';

const routes: Routes = [
  {path: '', component: ProjectsListComponent},
  {path: 'functionalities', component: FunctionalitiesLitsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
