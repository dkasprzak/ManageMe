import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Functionality } from 'src/app/shared/models/functionality.model';
import { Project } from 'src/app/shared/models/project.model';
import { FuncionalityService } from 'src/app/shared/services/funcionality.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-functionalities-lits',
  templateUrl: './functionalities-lits.component.html',
  styleUrls: ['./functionalities-lits.component.scss']
})
export class FunctionalitiesLitsComponent {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns: string[] = ['Name', 'Description', 'Status', 'Project', 'Owner', 'Priority', 'Actions'];
  dataSource!: MatTableDataSource<Functionality, MatTableDataSourcePaginator>;

  functionalities!: Functionality[];
  projectId!: number;
  projectName!: string;

  constructor(
    private _functionalityService: FuncionalityService,
    private _projectService: ProjectService,
  ){}

  public ngOnInit(): void {
    this._projectService.getAllProjects().subscribe((projects: Project[]) => {
      projects.map((project: Project) => {
        this.projectId = project.id;
        this.projectName = project.name;
      });
    });
    this._getAllFunctionalities();
  }

  public isAlert(functionality: Functionality): string {
    if (functionality.status === 'todo') return 'RED';
    else if (functionality.status === 'doing') return 'ORANGE';
    else {
      return 'GREEN';
    }
  }

  private _getAllFunctionalities(): void{
    this._functionalityService.getAllFunctionalities().subscribe((response: Functionality[]) => {
      this.functionalities = response.filter((functionality: Functionality) => {
        return functionality.projectId == this.projectId;
      });

      this.functionalities.forEach((functionality: Functionality) => {
        const tasks = functionality.tasks;
        const taskStates = tasks.map((task) => task.state);

        if (taskStates.every((state) => state === 'done')) {
          functionality.status = 'done';
        } else if (taskStates.every((state) => state === 'todo')) {
          functionality.status = 'todo';
        } else {
          functionality.status = 'doing';
        }
      });
      this.dataSource = new MatTableDataSource(this.functionalities);    
    });
  }
}
