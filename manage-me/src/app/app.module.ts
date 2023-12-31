import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsListComponent } from './module/home/projects-list/projects-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FunctionalitiesLitsComponent } from './module/functionalities-lits/functionalities-lits.component';
import { CapitalLetterFirstPipe } from './shared/components/pipes/capital-letter-first.pipe';
import { ModalComponent } from './shared/components/modal/modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewFunctionalityModalComponent } from './shared/components/add-new-functionality-modal/add-new-functionality-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MoreInfoFunctionalityModalComponent } from './shared/components/more-info-functionality-modal/more-info-functionality-modal.component';
import { TaskTableComponent } from './module/task-table/task-table.component';
import { AddEditTaskModalComponent } from './shared/components/add-edit-task-modal/add-edit-task-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsListComponent,
    FunctionalitiesLitsComponent,
    CapitalLetterFirstPipe,
    ModalComponent,
    AddNewFunctionalityModalComponent,
    MoreInfoFunctionalityModalComponent,
    TaskTableComponent,
    AddEditTaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    CdkAccordionModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NavbarComponent, CapitalLetterFirstPipe, ModalComponent],
})
export class AppModule {}
