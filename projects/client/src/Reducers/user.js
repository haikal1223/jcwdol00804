const INITIAL_STATE = {};

export const userReducer = (state = INITIAL_STATE, action) => {
  // action menerima 2 buah property ---> type & payload
  switch (action.type) {
    case "LOGIN_SUCCESS":
      // memperbarui data pada state dengan data dari action.payload
      return { ...state, ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    case "UPDATE_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
