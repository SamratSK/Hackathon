// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Routing
import { MainRoutingModule } from './main.routing';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { QuestionComponent } from './question/question.component';

// Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [DashboardComponent, CreateExamComponent, QuestionComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class MainModule {}
