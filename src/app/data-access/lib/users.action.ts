import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user';

export const loadUsers = createAction('[Users/Api] Load Users')
export const loadUsersSuccess = createAction('[UsersList] load users success', props<{ users: IUser[] }>())
export const loadUserError = createAction('[UsersList] load users error', props<{ error: any }>())

export const removeUser = createAction('[UsersList] delete user', props<{ userId: number }>())
export const removeUserSuccess = createAction('[UsersList] delete user success', props<{ userId: number }>())
export const removeUserError = createAction('[UsersList] delete user error', props<{ error: any }>())

export const createUser = createAction('[UsersList] create user', props<{ user: IUser }>())
export const createUserSuccess = createAction('[UsersList] create user success', props<{ user: IUser }>())
export const createUserError = createAction('[UsersList] create user error', props<{ error: any }>())


export const editUser = createAction('[UsersList] edit user', props<{ editedUser: IUser }>())
export const editUserSuccess = createAction('[UsersList] edit user success', props<{ editedUser: IUser }>())
export const editUserError = createAction('[UsersList] edit user error', props<{ error: any }>())

