import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStory } from '../interfaces';
import { StoryRes } from '../services/stories.resource';

@Component({
  selector: 'stories',
  styles: [`
  `],
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {

  storyList: IStory[] = [];

  constructor(public route: ActivatedRoute, private storyRes: StoryRes) {
  }

  public ngOnInit() {
    this.storyList = this.storyRes.query((stories: IStory[]) => {
      console.info(stories);
    });
  }
}
