const INITIAL_STATE = {
    // id: 0,
    // name: '',
    // email: '',
    // is_verified: 0,
    // role_id: 0,
    // profile_img: ''
};

export const userReducer = (state = INITIAL_STATE, action) => {
    // action menerima 2 buah property ---> type & payload
    console.log("Data dari component ==>", action);
    switch (action.type) {
        case "LOGIN_SUCCESS":
            // memperbarui data pada state dengan data dari action.payload
            return { ...state, ...action.payload };
        case "LOGOUT":
            return INITIAL_STATE;
        default:
            return state;
    }
}