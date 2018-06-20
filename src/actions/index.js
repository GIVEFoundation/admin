import * as types from "../constants";

export function fetchKids(query,pagesize) {
  return async dispatch => {
    dispatch(fetchKidsLoading());
    try {
      const token = process.env.REACT_APP_API_TOKEN;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}?address=${query}&key=${token}`,
        {
          method: "get"
        }
      );
      const json = await response.json();
      dispatch(fetchKidsSuccess(json, query));
    } catch (err) {
      console.log(err);
      dispatch(fetchKidsError(err));
    }
  };
}

export function fetchKidsSuccess(json, query) {
  return {
    type: types.FETCH_KIDS_SUCCESS,
    main: json,
    query
  };
}

export function fetchKidsError(error) {
  return {
    type: types.FETCH_KIDS_ERROR,
    error
  };
}

export function fetchKidsLoading(isLoading) {
  return {
    type: types.FETCH_KIDS_LOADING
  };
}
