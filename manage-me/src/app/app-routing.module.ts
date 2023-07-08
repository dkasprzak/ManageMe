import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './module/home/projects-list/projects-list.component';
import { FunctionalitiesLitsComponent } from './module/functionalities-lits/functionalities-lits.component';
import { TaskTableComponent } from './module/task-table/task-table.component';

const routes: Routes = [
  {path: '', component: ProjectsListComponent},
  {path: 'functionalities', component: FunctionalitiesLitsComponent},
  {path: 'task-table', component: TaskTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
