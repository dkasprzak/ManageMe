import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Functionality } from 'src/app/shared/models/functionality.model';
import { Project } from 'src/app/shared/models/project.model';
import { FunctionalityService } from 'src/app/shared/services/functionality.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { AddEditTaskModalComponent } from 'src/app/shared/components/add-edit-task-modal/add-edit-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoTaskModalComponent } from 'src/app/shared/components/more-info-task-modal/more-info-task-modal.component';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  functionalities!: Functionality[];

  projectName!: string;
  projectId!: number;

  constructor(
    private _projectService: ProjectService,
    private _functionalityService: FunctionalityService,
    private _taskService: TaskService,
    public modal: MatDialog
  ) {}

  public ngOnInit(): void {
    this._getAllProjects();
    this._getAllFunctionalities();
  }

  private _getAllProjects(): void {
    this._projectService.getAllProjects().subscribe((projects: Project[]) => {
      projects.map((project: Project) => {
          this.projectId = project.id;
          this.projectName = project.name;
      });
    });
  }

  private _getAllFunctionalities(): void {
    this._functionalityService.getAllFunctionalities().subscribe((response: Functionality[]) => {
      this.functionalities = response.filter((functionality: Functionality) => {
        return functionality.projectId === this.projectId;
      });

      this.todoTasks = this._categorizeTasks('todo');
      this.inProgressTasks = this._categorizeTasks('doing');
      this.doneTasks = this._categorizeTasks('done');
    });
  }

  private _categorizeTasks(state: string): Task[] {
    return this.functionalities
      .flatMap((functionality: Functionality) => functionality.tasks)
      .filter((task: Task) => task.state === state);
  }

  public isAlertState(task: Task): string {
    if (task.state === 'todo') return 'RED';
    else if (task.state === 'doing') return 'ORANGE';
    else {
      return 'GREEN';
    }
  }

  public isAlertPriority(task: Task): string {
    if (task.priority === 'high') return 'RED';
    else if (task.priority === 'medium') return 'ORANGE';
    else {
      return 'GREEN';
    }
  }

  public onCardDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      setTimeout(() => {
        const currentTask = event.container.data[event.currentIndex];

        if (event.container.id === 'done') {
          currentTask.state = 'done';
        } else if (event.container.id === 'doing') {
          currentTask.state = 'doing';
        } else if (event.container.id === 'todo') {
          currentTask.state = 'todo';
        }

        this._taskService.updateTaskState(currentTask.functionalityId, currentTask).subscribe();
      }, 0);

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  public addNewTask(): void {
    const config = {
      data: {
        functionalities: this.functionalities,
        isNewTask: true,
      },
      height: '650px',
      width: '750px',
    };

    const modalRef = this.modal.open(AddEditTaskModalComponent, config);
    modalRef.afterClosed().subscribe((isUserConfirm: boolean) => {
      if (isUserConfirm) {
        this._getAllFunctionalities();
      }
    });
  }

  public editTask(task: Task): void {
    const config = {
      data: {
        id: task.id,
        functionalityId: task.functionalityId,
        name: task.name,
        priority: task.priority,
        description: task.description,
        state: task.state,
        dateAdded: task.dateAdded,
        dateStart: task.dateStart,
        dateEnd: task.dateEnd,
        taskBelongToFunctionality: task.taskBelongToFunctionality,
        userResponsibleForTask: task.userResponsibleForTask,
        functionalities: this.functionalities,
        predictedExecutionTime: task.predictedExecutionTime,
        isNewTask: false,
      },
      height: '650px',
      width: '750px',
    };
    const modalRef = this.modal.open(AddEditTaskModalComponent, config);
    modalRef.afterClosed().subscribe((isFunctionalityEdited) => {
      if (isFunctionalityEdited) {
        this._getAllFunctionalities();
      }
    });
  }

  public openMoreInfoTask(task: Task): void {
    const config = {
      data: {
        projectName: this.projectName,
        task: task,
      },
      height: '340px',
      width: '450px',
    };

    this.modal.open(MoreInfoTaskModalComponent, config);
  }
}
