# React-Redux User Fetching App

This project is a simple React app that fetches and displays a list of users using Redux for state management and `redux-thunk` for handling asynchronous actions. The app connects to an API to retrieve user data and displays it in a list format. Below is a breakdown of the core structure and components used in the project.

## Project Structure

The project is structured as follows:

```
├── src
│   ├── components
│   │   └── UserList.tsx     # Displays the list of users
│   ├── store
│   │   ├── action-creators
│   │   │   └── user.ts      # Contains the fetchUsers thunk to fetch users asynchronously
│   │   ├── reducers
│   │   │   └── user.ts      # User reducer managing user-related state
│   │   └── index.ts         # Store configuration with redux-thunk middleware
│   ├── hooks
│   │   └── useTypedSelector.ts # Custom hook for typed selector
│   └── App.tsx              # Main entry point for the app
├── package.json             # Project dependencies and scripts
├── README.md                # Project description (this file)
└── tsconfig.json            # TypeScript configuration
```

## Key Features

- **React & TypeScript:** Provides strong typing and structure for the app's components and logic.
- **Redux Toolkit:** Manages the app's global state.
- **redux-thunk Middleware:** Handles asynchronous actions to fetch data from an API.
- **API Integration:** Fetches users from `https://jsonplaceholder.typicode.com/users`.

## Components

### UserList.tsx

The `UserList` component is responsible for fetching and displaying a list of users. It uses the `useTypedSelector` hook to access the user state from Redux, and dispatches the `fetchUsers` thunk when the component is mounted.

```tsx
import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store/action-creators/user";

const UserList: React.FC = () => {
  const { users, error, loading } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users && users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};

export default UserList;
```

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
import axios from "axios";
import { UserAction, UserActionTypes } from "../../types/user";

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.FETCH_USERS });
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setTimeout(() => {
                dispatch({ type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data });
            }, 500);
        } catch (error) {
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR,
                payload: error.message,
            });
        }
    };
};
```

## State and Reducers

The reducer handles the state transitions for fetching users (loading, success, and error states).

```ts
import { UserAction, UserActionTypes } from "../../types/user";

interface UserState {
    users: any[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return { ...state, loading: true, error: null };
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case UserActionTypes.FETCH_USERS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
```

## Conclusion

This project demonstrates the use of React with Redux Toolkit and TypeScript to create a simple yet scalable application that fetches and displays data asynchronously. The integration with `redux-thunk` allows for clean handling of side effects like API calls.
