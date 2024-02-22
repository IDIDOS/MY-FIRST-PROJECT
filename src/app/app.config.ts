import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store'
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { reducer, USERS_FEATURE_KEY } from './data-access/lib/users.reducer';
import { userEffects } from './data-access';
import { BASE_URL_TOKEN, environment, LOCAL_STORAGE_USERS_KEY } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideAnimationsAsync(),

  provideEffects(
    userEffects
  ),
  provideStore({
    [USERS_FEATURE_KEY]: reducer
  }),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75
  }),
  { provide: BASE_URL_TOKEN, useValue: environment.baseUrl },
  { provide: LOCAL_STORAGE_USERS_KEY, useValue: environment.localStorageKey }
  ]
};
