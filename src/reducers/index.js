import * as types from "../constants";

const initialState = {
  error: "",
  isLoading: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_KIDS_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case types.FETCH_KIDS_SUCCESS: {
      return {
        ...state,
        main: action.main,
        query: action.query,
        isLoading: false
      };
    }
    case types.FETCH_KIDS_ERROR: {
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    }
    default:
      return state;
  }
}
