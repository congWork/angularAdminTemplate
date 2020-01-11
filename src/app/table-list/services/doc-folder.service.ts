import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { PeriodicElement } from '../table-list.component';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class DocFolderService {
  baseUrl: string = 'api/docFolders';
  constructor(private http: HttpClient) { }

  makeRealOnlineApiCall():Observable<any> {
    return this.http.get("https://my-json-server.typicode.com/typicode/demo/posts").pipe(
         catchError(this.handleError)
       );
  }
  
  getAll(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>('api/docFolders').pipe(
      // tap(data => console.log(data)), // eyeball results in the console
         catchError(this.handleError)
       );
  }

  updateHero (data: PeriodicElement): Observable<null | PeriodicElement> {
    return this.http.put<PeriodicElement>(this.baseUrl, data, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    // and reformat for user consumption
    console.error(error); // log to console instead
    return throwError(error);
  }
}
