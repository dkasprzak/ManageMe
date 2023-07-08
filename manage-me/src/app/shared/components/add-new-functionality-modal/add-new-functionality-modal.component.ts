import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatusConstants } from '../../constants/status.constants';
import { PriorityConstants } from '../../constants/priority.constants';
import { FunctionalityService } from 'src/app/shared/services/functionality.service';

export interface AddOrEditFunctionalityData {
  id: number;
  projectId: number;
  name: string;
  description: string;
  status: string;
  project: string;
  owner: string;
  priority: string;
  isNewFunctionality: boolean;
}

@Component({
  selector: 'app-add-new-functionality-modal',
  templateUrl: './add-new-functionality-modal.component.html',
  styleUrls: ['./add-new-functionality-modal.component.scss']
})
export class AddNewFunctionalityModalComponent {
  functionalityId!: number;

  statuses = StatusConstants.statuses;
  priorities = PriorityConstants.priorities;

  addOrEditFunctionalityForm = this._formBuilder.nonNullable.group({
    name: [`${!this.modalValues.isNewFunctionality ? this.modalValues.name : ''}`, Validators.required],
    description: [`${!this.modalValues.isNewFunctionality ? this.modalValues.description : ''}`, Validators.required],
    status: [`${!this.modalValues.isNewFunctionality ? this.modalValues.status : ''}`, Validators.required],
    project: [{ value: this.modalValues.project, disabled: true }, Validators.required],
    owner: [{value: 'John Doe', disabled: true }, Validators.required],
    priority: [`${!this.modalValues.isNewFunctionality ? this.modalValues.priority : ''}`, Validators.required],
  });

  constructor(
    public modalRef: MatDialogRef<AddOrEditFunctionalityData>,
    @Inject(MAT_DIALOG_DATA) public modalValues: AddOrEditFunctionalityData,
    private _formBuilder: FormBuilder,
    private _functionalityService: FunctionalityService
  ) {}

  public ngOnInit(): void {
    this.functionalityId = this.modalValues.id;
  }

  public save(): void {
    if (this.addOrEditFunctionalityForm.invalid) {
      alert('Fill empty fields');
      return;
    }

    if (this.modalValues.isNewFunctionality) {
      const form = {
        project: this.modalValues.project,
        projectId: this.modalValues.projectId,
        ...this.addOrEditFunctionalityForm.value,
      };
      this._functionalityService.addNewFunctionality(form).subscribe();
    } else {
      this._functionalityService
        .editFunctionality(this.functionalityId, {
          project: this.modalValues.project,
          ...this.addOrEditFunctionalityForm.value,
        })
        .subscribe();
    }

    const userEdited: boolean = true;

    this.modalRef.close(userEdited);
  }
}
