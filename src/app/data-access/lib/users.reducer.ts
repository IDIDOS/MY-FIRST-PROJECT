import { IUser } from "../../models/user";
import { Action, createReducer, on, State } from '@ngrx/store';
import * as UsersActions from './users.action';

export const USERS_FEATURE_KEY = 'users';
export interface IState {
    users: IUser[]
}
export const initialState: IState = {
    users: []
}

export const reducer = createReducer(
    initialState,


    on(UsersActions.loadUsers, (state) => ({
        ...state
    })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users
    })),
    on(UsersActions.loadUserError, (state, { error }) => ({
        ...state,
        error

    })),


    on(UsersActions.removeUser, (state, { userId }) => ({
        ...state
    })),
    on(UsersActions.removeUserSuccess, (state, { userId }) => ({
        ...state,
        users: state.users.filter(user => user.id !== userId)
    })),
    on(UsersActions.removeUserError, (state, { error }) => ({
        ...state,
        error
    })),


    on(UsersActions.createUser, (state, { user }) => ({
        ...state
    })),
    on(UsersActions.createUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user]
    })),
    on(UsersActions.createUserError, (state, { error }) => ({
        ...state,
        error
    })),

    on(UsersActions.editUser, (state, { editedUser }) => ({
        ...state
    })),
    on(UsersActions.editUserSuccess, (state, { editedUser }) => ({
        ...state,
        users: state.users.map(user => user?.id == editedUser.id ? editedUser : user)
    })),
    on(UsersActions.editUserError, (state, { error }) => ({
        ...state,
        error
    }))
)

