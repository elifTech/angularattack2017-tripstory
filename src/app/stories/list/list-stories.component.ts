import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { ActivatedRoute, Router } from '@angular/router';
import { IStory } from '../../interfaces';
import { StoryRes } from '../../services/stories.resource';

@Component({
  selector: 'list-stories',
  styleUrls: [
    './list-stories.component.scss'
  ],
  templateUrl: './list-stories.component.html'
})
export class ListStoriesComponent implements OnInit {

  storyList: IStory[] = [];

  constructor(public route: ActivatedRoute,
              private storyRes: StoryRes,
              private router: Router,
              private auth: AuthService) {
  }

  public ngOnInit() {
    this.storyRes.query().subscribe((stories: IStory[]) => {
       this.storyList = stories;
    });
  }

  public routeIsActive(routePath: string)
  {
    return this.router.url === routePath;
  }

  public logout() {
    this.auth.logout()
      .subscribe({
        error: (err: any) => console.error(err),
        complete: () => this.router.navigateByUrl('login')
      });
  }
}
