import { Component, OnInit } from '@angular/core';
import {NewtaskComponent} from './newtask/newtask.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {TasklistService} from './tasklist.service';

export interface Data {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: Date;
  updateDate: Date;
  conclusionDate: Date;
}

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})

export class TasklistComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private service: TasklistService,
  ) { }

  data: any[];
  displayedColumns: string[] = [
    'title',
    'description',
    'status',
    'creationDate',
    'updateDate',
    'conclusionDate',
    'statusbutton',
    'button',
    'delete',
  ];
  dataSource: any;

  ngOnInit(): void {
    this.service.getTasks().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<Data>(data.content);
    });
  }

  onClick() {
    this.dialog.open(NewtaskComponent);
  }

  edit(event) {
    this.dialog.open(NewtaskComponent, {
      data: {
        id: event.id,
        title: event.title,
        description: event.description,
      }
    });
  }

  close(row: any) {
    row.status = 'Terminado';
    this.service.saveOrUpdate(row).subscribe(data => {
      row.conclusionDate = data.conclusionDate;
    }, () => {
      row.status = 'Pendente';
    });
  }

  delete(row: any) {
    this.service.delete(row).subscribe(() => {
      location.reload();
    });
  }

  open(row: any) {
    row.status = 'Pendente';
    this.service.saveOrUpdate(row).subscribe(data => {
      row.conclusionDate = data.conclusionDate;
    }, () => {
      row.status = 'Terminado';
    });
  }
}
