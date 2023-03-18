export const loginAction = (data) => {
    console.log("Data dari component ==>", data);
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const logoutAction = () => {
    localStorage.removeItem('xmart_login')
    return {
        type : "LOGOUT"
    }
}