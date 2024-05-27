import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('../modules/users/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'gift',
    loadChildren: () =>
      import('../modules/gift/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('../modules/faq/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'challenge',
    loadChildren: () =>
      import('../modules/challenge/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'join-challenges',
    loadChildren: () =>
      import('../modules/join-challenges/product.module').then((m) => m.ProductModule),
  },
  {
    path: '',
    redirectTo: '/users/list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
