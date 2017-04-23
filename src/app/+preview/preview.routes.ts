import { PreviewComponent } from './preview.component';

export const routes = [
  {
    path: '', children: [
    {path: ':id', component: PreviewComponent},
    // { path: 'child-barrel', loadChildren: './+child-barrel#ChildBarrelModule' }
  ]
  },
];
