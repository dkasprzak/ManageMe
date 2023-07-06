import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Functionality } from 'src/app/shared/models/functionality.model';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns: string[] = ['id', 'Project Name', 'Description'];
  dataSource!: MatTableDataSource<Project, MatTableDataSourcePaginator>;

  projects!: Project[];

  projectName!: string;

  constructor(
    private _projectService: ProjectService,
  ){}
  
  public ngOnInit(): void {
    this._getAllProjects();
  }


  private _getAllProjects(): void {
    this._projectService.getAllProjects().subscribe((projects: Project[]) => {
      projects.map((project: Project) => {
          this.projectName = project.name;
      });
      this.projects = projects;
      this.dataSource = new MatTableDataSource(this.projects);
    });
  }
}
