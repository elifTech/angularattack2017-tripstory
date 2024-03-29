import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { ActivatedRoute, Router } from '@angular/router';
import { IStory } from '../interfaces';
import { StoryRes } from '../services/stories.resource';
import { AppState } from '../app.service';
import { MAP_STYLES } from '../config';

@Component({
  selector: 'stories',
  styleUrls: [
    './stories.component.scss'
  ],
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {

  storyList: IStory[] = [];

  constructor(public route: ActivatedRoute,
              public appState: AppState,
              private storyRes: StoryRes,
              private router: Router,
              private auth: AuthService) {
  }

  public ngOnInit() {
    const mapStyle = MAP_STYLES;

    var vinnitsa = new google.maps.LatLng(49.2325477, 28.4744695);

    const myOptions = {
      zoom: 6,
      center: vinnitsa,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapStyle
    };
    const map = new google.maps.Map(document.getElementById("map"), myOptions);
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
