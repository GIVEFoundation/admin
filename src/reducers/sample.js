import * as types from '../constants';

const initialState = {
  hasErrored: false,
  isLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SAMPLE_TYPE: {
      return {
        ...state,
        id
      };
    }
    default:
      return state;
  }
}
