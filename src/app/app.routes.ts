import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent, pathMatch: 'full' },
    { path: 'users', loadComponent: () => import('./components/users-list/users-list.component').then(c => c.UsersListComponent) }
];
