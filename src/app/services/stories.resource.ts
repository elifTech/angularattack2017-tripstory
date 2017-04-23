import { Injectable } from '@angular/core';
import { ResourceParams, ResourceCRUD } from 'ngx-resource';
import { API_URL } from '../config';
import { IStory } from '../interfaces';

interface IQueryInput {
  page?: number;
  perPage?: number;
}

@Injectable()
@ResourceParams({
  url: `${API_URL}/api/stories`
})
export class StoryRes extends ResourceCRUD<IQueryInput, IStory, IStory> {
}
