import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

export interface TaskInfoModal {
  projectName: string;
  task: Task;
}

@Component({
  selector: 'app-more-info-task-modal',
  templateUrl: './more-info-task-modal.component.html',
  styleUrls: ['./more-info-task-modal.component.scss'],
})
export class MoreInfoTaskModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public taskInfo: TaskInfoModal, public modalRef: MatDialogRef<TaskInfoModal>) {}
}
