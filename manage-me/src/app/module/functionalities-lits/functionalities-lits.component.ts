import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { AddNewFunctionalityModalComponent } from 'src/app/shared/components/add-new-functionality-modal/add-new-functionality-modal.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { MoreInfoFunctionalityModalComponent } from 'src/app/shared/components/more-info-functionality-modal/more-info-functionality-modal.component';
import { Functionality } from 'src/app/shared/models/functionality.model';
import { Project } from 'src/app/shared/models/project.model';
import { FunctionalityService } from 'src/app/shared/services/functionality.service';
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
    private _functionalityService: FunctionalityService,
    private _projectService: ProjectService,
    public modal: MatDialog,
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

  public editFunctionality(event: Event, functionality: Functionality): void {
    event.stopPropagation();
    const config = {
      data: {
        id: functionality.id,
        name: functionality.name,
        description: functionality.description,
        status: functionality.status,
        project: functionality.project,
        owner: functionality.owner,
        priority: functionality.priority,
        isNewFunctionality: false,
      },
      height: '550px',
      width: '750px',
    };
    const modalRef = this.modal.open(AddNewFunctionalityModalComponent, config);
    modalRef.afterClosed().subscribe((isFunctionalityEdited) => {
      if (isFunctionalityEdited) {
        this._getAllFunctionalities();
      }
    });
  }

  public addNewFunctionality() {
    const config = {
      data: {
        project: this.projectName,
        projectId: this.projectId,
        isNewFunctionality: true,
      },
      height: '550px',
      width: '750px',
    };
    const modalRef = this.modal.open(AddNewFunctionalityModalComponent, config);
    modalRef.afterClosed().subscribe((isUserConfirm: boolean) => {
      if (isUserConfirm) {
        this._getAllFunctionalities();
      }
    });
  }

  public deleteFunctionality(event: Event, functionalityId: number): void {
    event.stopPropagation();
    const config = {
      data: 'Are you sure to delete this functionality ?',
      height: '155px',
      width: '450px',
    };
    const modalRef = this.modal.open(ModalComponent, config);
    modalRef.afterClosed().subscribe((isUserConfirm: boolean) => {
      if (isUserConfirm) {
        this._functionalityService.deleteFunctionality(functionalityId).subscribe();
        this._getAllFunctionalities();
      }
    });
  }

  public isAlert(functionality: Functionality): string {
    if (functionality.status === 'todo') return 'RED';
    else if (functionality.status === 'doing') return 'ORANGE';
    else {
      return 'GREEN';
    }
  }

  private _getAllFunctionalities(): void {
    this._functionalityService.getAllFunctionalities().subscribe((response: Functionality[]) => {
      this.functionalities = response.filter((functionality: Functionality) => {
        return functionality.projectId == this.projectId;
      });
  
      this.functionalities.forEach((functionality: Functionality) => {
        if (functionality.status !== 'done' && functionality.status !== 'todo' && functionality.status !== 'doing') {
          functionality.status = 'done';
        }
      });
      this.dataSource = new MatTableDataSource(this.functionalities);
    });
  }

  public moreInfoFunctionality(event: Event, functionality: Functionality): void {
    event.stopPropagation();

    const config = {
      data: functionality,
      height: '410px',
      width: '450px',
    };

    this.modal.open(MoreInfoFunctionalityModalComponent, config);
  }
}
