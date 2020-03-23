import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TasklistService} from '../tasklist.service';

export interface DialogData {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {

  task: FormGroup;

    ngOnInit(): void {
      if (this.data && this.data.id) {
        this.task.patchValue(this.data);
      }
    }

  constructor(
    public dialogRef: MatDialogRef<NewtaskComponent>,
    private fb: FormBuilder,
    private service: TasklistService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.task = fb.group({
        id: [null],
        title: [''],
        description: ['']
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.service.saveOrUpdate(this.task.value).subscribe(() => {
      this.dialogRef.close();
      location.reload();
    });
  }

}
