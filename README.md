# React-Redux User Fetching App

This project is a simple React app that fetches and displays a list of users using Redux for state management and `redux-thunk` for handling asynchronous actions. The app connects to an API to retrieve user data and displays it in a list format. Below is a breakdown of the core structure and components used in the project.

## Project Structure

The project is structured as follows:

```
├── src
|    ├── components
│    |       ├── UserList.css          # Styling for the UserList component
│    |       └── UserList.tsx          # Displays the list of users
|    ├── hooks
|    │     ├── useAction.ts          # Custom hook to dispatch Redux actions
|    │     └── useTypedSelector.ts   # Custom hook for typed Redux selectors
|    ├── store
|    │     ├── action-creators
|    │     │   ├── index.ts          # Exports all action creators
|    │     │   └── user.ts           # Contains the fetchUsers thunk to fetch users asynchronously
|    │     ├── reducers
|    │     │   ├── index.ts          # Combines all reducers into a root reducer
|    │     │   └── userReducer.ts    # User reducer managing user-related state
|    │     └── index.ts              # Store configuration with redux-thunk middleware
|    ├── types
|    │     ├── user.ts               # Type definitions for the User state and actions
|    ├── App.css                   # Global styles for the app
|    ├── App.tsx                   # Main app component
|    ├── main.tsx                  # App entry point
|    └── vite-env.d.ts             # Vite environment type declaration
```

## Key Features

- **React & TypeScript:** Provides strong typing and structure for the app's components and logic.
- **Redux Toolkit:** Manages the app's global state.
- **redux-thunk Middleware:** Handles asynchronous actions to fetch data from an API.
- **API Integration:** Fetches users from `https://jsonplaceholder.typicode.com/users`.

## Components

### UserList.tsx

The `UserList` component is responsible for fetching and displaying a list of users. It uses the `useTypedSelector` hook to access the user state from Redux, and dispatches the `fetchUsers` thunk when the component is mounted.

## Store Setup

The store is configured using `configureStore` from `@reduxjs/toolkit`, with `redux-thunk` middleware for handling asynchronous actions.

```ts
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});
```

## Asynchronous User Fetching (Thunk)

The `fetchUsers` action is an asynchronous thunk that dispatches actions to handle the different states of the API request (loading, success, and error).

```ts
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
```

## State and Reducers

The reducer handles the state transitions for fetching users (loading, success, and error states).

```ts
import { UserAction, UserActionTypes, UserState } from "../../types/user"

const initialState:UserState ={
    users:[],
    originalUsers: [],
    loading:false,
    error:null
}
export const userReducer = (state:UserState = initialState, action:UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return { ...state, loading:state.originalUsers.length === 0,error: null, users:[], originalUsers:[]}
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, loading:false, error: null, users:action.payload, originalUsers: action.payload,}
        case UserActionTypes.FETCH_USERS_ERROR:
            return { ...state, loading:false, error: action.payload, users:[],originalUsers:[]}
        case UserActionTypes.SEARCH_USERS:
            return {
                ...state,
                loading: state.originalUsers.length === 0,
                error: null,
                users: action.allValuesEmpty
                    ? state.originalUsers 
                    : state.originalUsers.filter((el) => {
                          return action.payload.every(([key, value]) => {
                            const fieldValue = el[key as keyof typeof el];
                              if (value && typeof fieldValue === 'string') {
                                  return fieldValue.toLowerCase().startsWith(value.toLowerCase());
                              }
                              return true;
                          });
                      }),
            };
        case UserActionTypes.ADD_USER:
            return {...state, originalUsers : [...state.users, action.payload]}
        default:
            return state
    }
}
```

## Conclusion

This project demonstrates the use of React with Redux Toolkit and TypeScript to create a simple yet scalable application that fetches and displays data asynchronously. The integration with `redux-thunk` allows for clean handling of side effects like API calls.
