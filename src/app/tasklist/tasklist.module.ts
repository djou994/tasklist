import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NewtaskComponent } from './newtask/newtask.component';
import {NewtaskModule} from './newtask/newtask.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [NewtaskComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    NewtaskModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
  ]
})
export class TasklistModule { }
