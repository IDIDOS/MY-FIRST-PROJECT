import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap, map, of, tap, iif } from "rxjs";
import { LocalStorageService } from "../../services/local-storage.service";
import { UserApiService } from "../../services/user-api.service";
import * as UsersActions from "./users.action"




export const getUsers$ = createEffect(
    () => {
        const action$ = inject(Actions);
        const userApiService = inject(UserApiService);
        const localStorageService = inject(LocalStorageService)
        return action$.pipe(
            ofType(UsersActions.loadUsers),
            switchMap(
                () => localStorageService.getUsers().pipe(
                    switchMap(
                        (localUsers) => {
                            return iif(
                                () => !!localUsers?.length,
                                of(UsersActions.loadUsersSuccess({ users: localUsers })),
                                userApiService.getUsers().pipe(
                                    tap(users => localStorageService.saveUsers(users)),
                                    map(users => UsersActions.loadUsersSuccess({ users })),
                                    catchError(error => {
                                        console.error("ERROR", error);
                                        return of(UsersActions.loadUserError({ error }))
                                    })
                                )
                            )
                        }
                    )

                )
            )

        )
    }, { functional: true }
)

export const removeUser$ = createEffect(
    () => {
        const action$ = inject(Actions);
        const localStorageService = inject(LocalStorageService)

        return action$.pipe(
            ofType(UsersActions.removeUser),
            switchMap(
                ({ userId }) => localStorageService.deleteUser(userId)
                    .pipe(
                        map(userId => UsersActions.removeUserSuccess({ userId })),
                        catchError(error => {
                            console.error("ERROR", error);
                            return of(UsersActions.removeUserError({ error }))
                        })
                    )
            )
        )
    },
    { functional: true }
)

export const createUser$ = createEffect(
    () => {
        const action$ = inject(Actions);
        const localStorageService = inject(LocalStorageService)
        return action$.pipe(
            ofType(UsersActions.createUser),
            switchMap(
                ({ user }) => localStorageService.addUser(user).pipe(
                    map(user => UsersActions.createUserSuccess({ user })),
                    catchError(error => {
                        console.log("ERROR", error);
                        return of(UsersActions.createUserError({ error }))
                    })
                )
            )
        )
    }, { functional: true }
)


export const editUser$ = createEffect(
    () => {
        const action$ = inject(Actions);
        const localStorageService = inject(LocalStorageService);
        return action$.pipe(
            ofType(UsersActions.editUser),
            switchMap(
                ({ editedUser }) => localStorageService.editUser(editedUser).pipe(
                    map(editedUser => UsersActions.editUserSuccess({ editedUser })),
                    catchError(error => {
                        console.log("ERROR", error);
                        return of(UsersActions.editUserError({ error }))
                    })
                )
            )
        )
    },
    { functional: true }
)