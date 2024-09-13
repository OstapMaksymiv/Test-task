import { Dispatch } from "@reduxjs/toolkit";
import {Customer, SearchedCustomer, UserAction, UserActionTypes} from "../../types/user";
import axios from "axios";

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setTimeout(() => {
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
            }, 3000)
        } catch (error) {
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR,
                payload: `${error}`
            })
        }
    }
}
export const searchUsers = (data:SearchedCustomer) => {
    const payload = Object.keys(data).map((key:string) => [key, data[key]])
    const isAllValuesEmpty = payload.every(([, value]) => value === "");

    return {
        type:UserActionTypes.SEARCH_USERS, 
        payload:payload,
        allValuesEmpty: isAllValuesEmpty
    }
}
export const addUser = (user: Customer) => {
    return {
        type:UserActionTypes.ADD_USER,
        payload: user
    }
}
