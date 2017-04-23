import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStory } from '../../interfaces';
import { StoryRes } from '../../services/stories.resource';

@Component({
  selector: 'new-stories',
  styles: [`
  `],
  templateUrl: './new-stories.component.html'
})
export class NewStoriesComponent implements OnInit {

  protected model:IStory = {};

  constructor(public route: ActivatedRoute, private storyRes: StoryRes) {
  }

  public ngOnInit() {
  }

  public onSubmit() {
    let story = this.storyRes.save(this.model);
    console.info(story);
  }

  get diagnostic() { return JSON.stringify(this.model); }
}
