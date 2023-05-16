export const indexReducer_LogIn = () => {
  console.log("Log In Actions");
  return {
    type: "LOGIN",
    payload: true,
  };
};

export const indexReducer_LogOut = () => {
  console.log("Log Out Actions");
  return {
    type: "LOGOUT",
    payload: false,
  };
};
