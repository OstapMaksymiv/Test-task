export enum UserActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    SEARCH_USERS = 'SEARCH_USERS',
    ADD_USER = 'ADD_USER',
}
export interface Customer {
    id: number ,
    name: string,
    username: string,
    email: string,
    phone: string
}
export interface SearchedCustomer {
    name: string,
    username: string,
    email: string,
    phone: string,
    [key:string]:string
}
export interface UserState{
    users:Customer[],
    loading:boolean,
    error: null | string
    originalUsers: Customer[],
}
interface FetchUsersAction {
    type:UserActionTypes.FETCH_USERS;
}
interface FetchUsersSuccessAction {
    type:UserActionTypes.FETCH_USERS_SUCCESS;
    payload:Customer[];
}
interface FetchUsersErrorAction {
    type:UserActionTypes.FETCH_USERS_ERROR;
    payload: string;
}
interface SearchUsersAction {
    type:UserActionTypes.SEARCH_USERS;
    payload: [string, string][];
    allValuesEmpty:boolean;
}
interface AddUserAction{
    type:UserActionTypes.ADD_USER;
    payload:Customer
}
export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction | SearchUsersAction | AddUserAction;