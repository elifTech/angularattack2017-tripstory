import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../config';
import { IStory } from '../interfaces';

@Injectable()
export class StoryRes {
  constructor(private http: Http) {

  }

  query(): Observable<IStory[]> {
    return this.http.get(`${API_URL}/api/stories`)
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
    let headers = new Headers({'Content-Type': 'application/json'});
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
