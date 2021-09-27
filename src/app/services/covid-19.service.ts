import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Covid19Service {
  private readonly GET_COVID_19_REPORT_URL = `${environment.apiURL}/report/country/code`;

  constructor(protected http: HttpClient) {}

  getCovidReports(request: any): Observable<any> {
    let headers = new HttpHeaders({
      'x-rapidapi-host': `${environment.apiHost}`,
      'x-rapidapi-key': `${environment.apiKeys}`,
    });
    return this.http.get<any>(this.GET_COVID_19_REPORT_URL, {
      headers: headers,
      params: request,
    });
  }
}
