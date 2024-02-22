import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState, USERS_FEATURE_KEY } from "./users.reducer";




export const selectUserState = createFeatureSelector<IState>(USERS_FEATURE_KEY);

export const selectAllUsers = createSelector(
    selectUserState,
    (state: IState) => state.users
)

