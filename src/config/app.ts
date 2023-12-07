const appConfig = {
  apiUrl: import.meta.env.APP_API_URL,
  loginUrl: import.meta.env.APP_API_URL + "/auth",
  logoutUrl: import.meta.env.APP_LOGOUT_URL,
  authenticationUrl: window.location.origin + "/authentication",
}

export default appConfig
