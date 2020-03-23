import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class TasklistService {
  taskListUrl = 'http://localhost:8090/api/admin/task/';
  createOrUpdate = 'http://localhost:8090/api/admin/task/createOrUpdate';
  deleteUrl = 'http://localhost:8090/api/admin/task/deleteTask/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  saveOrUpdate(task: any) {
    return this.http.post<any>(this.createOrUpdate, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  delete(task: any) {
    return this.http.delete<any>(this.deleteUrl + task.id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.taskListUrl)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
