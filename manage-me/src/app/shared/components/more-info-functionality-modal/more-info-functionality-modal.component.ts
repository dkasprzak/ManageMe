import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Functionality } from '../../models/functionality.model';


@Component({
  selector: 'app-more-info-functionality-modal',
  templateUrl: './more-info-functionality-modal.component.html',
  styleUrls: ['./more-info-functionality-modal.component.scss']
})
export class MoreInfoFunctionalityModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public functionalityInfo: Functionality,
    public modalRef: MatDialogRef<Functionality>
  ) {}

  ngOnInit(): void {}

  getUniqueUsers(tasks: any[]): string[] {
    const uniqueUsers: string[] = [];

    tasks.forEach((task) => {
      task.userResponsibleForTask.forEach((user: string) => {
        if (!uniqueUsers.includes(user)) {
          uniqueUsers.push(user);
        }
      });
    });

    return uniqueUsers;
  }
}
