import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../config';
import { IStory } from '../interfaces';
import { AuthService } from 'ng2-ui-auth';

@Injectable()
export class StoryRes {
  constructor(private http: Http,
              private auth: AuthService) {

  }

  query(): Observable<IStory[]> {
    const user = this.auth.getPayload();
    const accountId = user._id;

    let headers = new Headers({'Authorization': 'Bearer ' + this.auth.getToken()});
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${API_URL}/api/stories?account._id=${accountId}&sort=-createDate`, options)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [] || {};
  }

  get(id: string): Observable<IStory> {
    return this.http.get(`${API_URL}/api/stories/${id}`)
      .map(this.extractData);
  }

  create(story: IStory): Observable<IStory> {
    const user = this.auth.getPayload();

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(`${API_URL}/api/stories`, JSON.stringify(story), options)
      .map(this.extractData);

  }

  save(story: IStory): Observable<IStory> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(`${API_URL}/api/stories/${story._id}`, JSON.stringify(story), options)
      .map(this.extractData);
  }

}
