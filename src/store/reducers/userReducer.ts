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