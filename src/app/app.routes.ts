import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login';
import { StoriesComponent } from './stories';
import { NewStoriesComponent } from './stories/new';
import { EditStoriesComponent } from './stories/edit';
import { AuthGuard } from './services/auth.guard';

import { DataResolver } from './app.resolver';

export const ROUTER_PROVIDERS = [
  AuthGuard
];
export const ROUTES: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  {
    path: 'stories',
    component: StoriesComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'new', component: NewStoriesComponent },
      { path: ':id', component: EditStoriesComponent }
    ]
  },
  {path: 'detail', loadChildren: './+detail#DetailModule'},
  {path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  {path: 'preview', loadChildren: './+preview#PreviewModule'},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NoContentComponent},
];
