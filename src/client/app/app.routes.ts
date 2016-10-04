import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { PrimeRoutes } from './primeng/primeRoutes';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...PrimeRoutes
];
