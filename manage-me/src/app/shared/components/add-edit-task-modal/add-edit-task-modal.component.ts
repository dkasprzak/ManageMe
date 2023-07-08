import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatusConstants } from '../../constants/status.constants';
import { Functionality } from '../../models/functionality.model';
import { TaskService } from '../../services/task.service';
import { FunctionalityService } from '../../services/functionality.service';
import { User } from '../../models/user.model';
import { PriorityConstants } from '../../constants/priority.constants';
import { UserService } from '../../services/user.service';

export interface AddOrEditModalValues {
  id: number;
  functionalityId: number;
  name: string;
  priority: string;
  description: string;
  state: string;
  dateAdded: string;
  dateStart: string;
  dateEnd: string;
  userResponsibleForTask: string[];
  taskBelongToFunctionality: string;
  functionalities: Functionality[];
  predictedExecutionTime: string;
  isNewTask: boolean;
}

@Component({
  selector: 'app-add-edit-task-modal',
  templateUrl: './add-edit-task-modal.component.html',
  styleUrls: ['./add-edit-task-modal.component.scss'],
})
export class AddEditTaskModalComponent implements OnInit {
  priorities = PriorityConstants.priorities;
  statuses = StatusConstants.statuses;

  usersOptions!: User[];

  functionalities!: Functionality[];

  addOrEditTaskForm = this._formBuilder.nonNullable.group({
    name: [`${!this.modalValues.isNewTask ? this.modalValues.name : ''}`, Validators.required],
    description: [`${!this.modalValues.isNewTask ? this.modalValues.description : ''}`, Validators.required],
    dateStart: [`${!this.modalValues.isNewTask ? this.modalValues.dateStart : ''}`],
    dateEnd: [`${!this.modalValues.isNewTask ? this.modalValues.dateEnd : ''}`],
    state: [`${!this.modalValues.isNewTask ? this.modalValues.state : ''}`, Validators.required],
    taskBelongToFunctionality: [
      `${!this.modalValues.isNewTask ? this.modalValues.taskBelongToFunctionality : ''}`,
      Validators.required,
    ],
    userResponsibleForTask: [[''], Validators.required],
    priority: [`${!this.modalValues.isNewTask ? this.modalValues.priority : ''}`, Validators.required],
    predictedExecutionTime: [
      `${!this.modalValues.isNewTask ? this.modalValues.predictedExecutionTime : ''}`,
      Validators.required,
    ],
  });

  constructor(
    public modalRef: MatDialogRef<AddOrEditModalValues>,
    @Inject(MAT_DIALOG_DATA) public modalValues: AddOrEditModalValues,
    private _formBuilder: FormBuilder,
    private _functionalityService: FunctionalityService,
    private _userService: UserService,
    private _taskService: TaskService,
  ) {}

  public ngOnInit(): void {
    this._userService.getUsers().subscribe((response: User[]) => {
      this.usersOptions = response;
    });

    if (!this.modalValues.isNewTask) {
      this.addOrEditTaskForm.patchValue({ userResponsibleForTask: this.modalValues.userResponsibleForTask });
      this.addOrEditTaskForm.patchValue({ taskBelongToFunctionality: this.modalValues.taskBelongToFunctionality });
    }
  }

  public save(): void {
    if (this.addOrEditTaskForm.invalid) {
      alert('Fill empty fields');
      return;
    }

    if (this.modalValues.isNewTask) {
      const dateAdded = this._getCurrentDate();

      const form = {
        name: this.addOrEditTaskForm.controls.name.value,
        description: this.addOrEditTaskForm.controls.description.value,
        priority: this.addOrEditTaskForm.controls.priority.value,
        taskBelongToFunctionality: this.addOrEditTaskForm.controls.taskBelongToFunctionality.value,
        predictedExecutionTime: this.addOrEditTaskForm.controls.predictedExecutionTime.value,
        state: this.addOrEditTaskForm.controls.state.value,
        dateStart: this.addOrEditTaskForm.controls.dateStart.value,
        dateEnd: this.addOrEditTaskForm.controls.dateEnd.value,
        userResponsibleForTask: this.addOrEditTaskForm.controls.userResponsibleForTask.value,
        dateAdded: dateAdded,
      };

      this._taskService.addNewTask(form).subscribe();
    } else {
      const form = {
        name: this.addOrEditTaskForm.controls.name.value,
        description: this.addOrEditTaskForm.controls.description.value,
        priority: this.addOrEditTaskForm.controls.priority.value,
        taskBelongToFunctionality: this.addOrEditTaskForm.controls.taskBelongToFunctionality.value,
        predictedExecutionTime: this.addOrEditTaskForm.controls.predictedExecutionTime.value,
        state: this.addOrEditTaskForm.controls.state.value,
        dateStart: this.addOrEditTaskForm.controls.dateStart.value,
        dateEnd: this.addOrEditTaskForm.controls.dateStart.value,
        userResponsibleForTask: this.addOrEditTaskForm.controls.userResponsibleForTask.value,
        dateAdded: this.modalValues.dateAdded,
      };

      this._taskService.editTask(this.modalValues.functionalityId, this.modalValues.id, form).subscribe();
    }

    const userEdited: boolean = true;

    this.modalRef.close(userEdited);
  }


  private _getCurrentDate(): string {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  public deleteTask(): void {
    this._taskService.deleteTask(this.modalValues.functionalityId, this.modalValues.id).subscribe();

    const userEdited: boolean = true;

    this.modalRef.close(userEdited);
  }
}
