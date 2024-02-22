import { InjectionToken } from '@angular/core'

export const environment = {
    baseUrl: 'https://jsonplaceholder.typicode.com/users',
    localStorageKey: "Users"
};

export const LOCAL_STORAGE_USERS_KEY = new InjectionToken<string>('LOCAL_STORAGE_USERS_KEY')
export const BASE_URL_TOKEN = new InjectionToken<string>('BASE_URL_TOKEN')